"use client";

import React, { useState, useEffect, useRef } from "react";
import TaskList from "./TaskList";
import { supabase } from "@/lib/supabase";
import { listTasks } from "@/lib/task";
import { createPomodoroSession, updatePomodoroSession } from "@/lib/db";
import { notificationService } from '@/lib/notificationService';
import { Task } from "@/lib/types";

interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const [minutes, setMinutes] = useState(defaultSettings.workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [interruptions, setInterruptions] = useState(0);
  const [totalFocusSeconds, setTotalFocusSeconds] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  
  const notificationSound = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    notificationSound.current = new Audio('/notification.mp3');
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('preferences')
      .single();

    if (profile?.preferences?.pomodoro_settings) {
      setSettings(profile.preferences.pomodoro_settings);
      if (!isActive) {
        setMinutes(profile.preferences.pomodoro_settings.workDuration);
      }
    }
  };

  useEffect(() => {
    if (isActive) {
      document.title = `${formatTime(minutes)}:${formatTime(seconds)} - Foco Mágico`;
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              onTimerComplete();
              return 0;
            } else {
              setMinutes((m) => m - 1);
              return 59;
            }
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      document.title = 'Foco Mágico';
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, minutes, seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && mode === 'work') {
      interval = setInterval(() => setTotalFocusSeconds((s) => s + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, mode]);

  useEffect(() => {
    async function fetchTasks() {
      setLoadingTasks(true);
      const data = await listTasks(100);
      setTasks(data || []);
      setLoadingTasks(false);
    }
    fetchTasks();
  }, []);

  const onTimerComplete = async () => {
    notificationSound.current?.play();
    
    if (mode === 'work') {
      // Completar sessão de trabalho
      if (currentSessionId) {
        await updatePomodoroSession(currentSessionId, {
          ended_at: new Date().toISOString(),
          was_completed: true,
          interruption_count: interruptions
        });
      }

      notificationService.success(
        'Sessão de foco concluída!',
        'Hora de fazer uma pausa. Você merece!',
        '/dashboard'
      );

      setCycles((c) => {
        const newCycles = c + 1;
        if (newCycles % settings.sessionsUntilLongBreak === 0) {
          setMode('long');
          setMinutes(settings.longBreakDuration);
          notificationService.info(
            'Pausa longa',
            'Você completou 4 sessões! Aproveite uma pausa mais longa.'
          );
        } else {
          setMode('short');
          setMinutes(settings.shortBreakDuration);
        }
        return newCycles;
      });
    } else {
      setMode('work');
      setMinutes(settings.workDuration);
      notificationService.reminder(
        'Voltar ao foco',
        'Sua pausa terminou. Vamos voltar ao trabalho?'
      );
    }
    
    setSeconds(0);
    setIsActive(false);
    setCurrentSessionId(null);
  };

  const startTimer = async () => {
    if (!isActive && mode === 'work') {
      const session = await createPomodoroSession({
        user_id: (await supabase.auth.getUser()).data.user!.id,
        started_at: new Date().toISOString(),
        duration: settings.workDuration,
        task_id: activeTaskId || undefined,
        was_completed: false,
        interruption_count: 0
      });
      setCurrentSessionId(session.id);
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setInterruptions(i => i + 1);
      notificationService.warning(
        'Timer pausado',
        'Lembre-se: manter o foco é importante para sua produtividade.'
      );
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setInterruptions(0);
    if (mode === 'work') {
      setMinutes(settings.workDuration);
    } else if (mode === 'short') {
      setMinutes(settings.shortBreakDuration);
    } else {
      setMinutes(settings.longBreakDuration);
    }
    setSeconds(0);
  };

  const skipBreak = () => {
    if (mode !== 'work') {
      setMode('work');
      setMinutes(settings.workDuration);
      setSeconds(0);
      notificationService.warning(
        'Pausa pulada',
        'Não se esqueça de fazer pausas regularmente para manter sua produtividade!'
      );
    }
  };

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {mode === 'work' ? 'Tempo de Foco' : mode === 'short' ? 'Pausa Curta' : 'Pausa Longa'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {mode === 'work' 
                ? 'Mantenha o foco na sua tarefa' 
                : 'Aproveite para descansar um pouco'}
            </p>
          </div>

          <div className="text-center mb-8">
            <div className="text-7xl font-bold mb-8 text-blue-600 dark:text-blue-500">
              {formatTime(minutes)}:{formatTime(seconds)}
            </div>

            <div className="space-x-4">
              {!isActive ? (
                <button
                  onClick={startTimer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Iniciar
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Pausar
                </button>
              )}
              <button
                onClick={resetTimer}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-medium transition"
              >
                Reiniciar
              </button>
              {mode !== 'work' && (
                <button
                  onClick={skipBreak}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-medium transition"
                >
                  Pular Pausa
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{cycles}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ciclos</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(totalFocusSeconds / 60)}min
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tempo Total</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{interruptions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interrupções</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Selecione uma Tarefa
          </h3>
          <TaskList 
            initialTasks={tasks} 
            onSelect={setActiveTaskId}
            selectedTaskId={activeTaskId}
            isLoading={loadingTasks}
          />
        </div>
      </div>
    </div>
  );
}
