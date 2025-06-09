"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Modal from '../ui/Modal';
import { useNotification } from '@/lib/notificationService';

type WeeklyGoal = {
  id: string;
  userId: string;
  focusMinutesGoal: number;
  tasksGoal: number;
  breathingSessionsGoal: number;
  startDate: string;
  endDate: string;
  currentFocusMinutes: number;
  currentTasks: number;
  currentBreathingSessions: number;
  achievedAt?: string;
  streakCount: number;
};

export default function WeeklyGoals() {
  const [goals, setGoals] = useState<WeeklyGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoals, setNewGoals] = useState({
    focusMinutesGoal: 0,
    tasksGoal: 0,
    breathingSessionsGoal: 0,
  });
  const notify = useNotification();

  useEffect(() => {
    loadWeeklyGoals();
  }, []);

  async function loadWeeklyGoals() {
    const monday = new Date();
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    
    const { data } = await supabase
      .from('weekly_goals')
      .select('*')
      .gte('startDate', monday.toISOString())
      .single();

    setGoals(data);
    setLoading(false);
  }

  const handleSaveGoals = async () => {
    const monday = new Date();
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);

    const { data, error } = await supabase
      .from('weekly_goals')
      .upsert({
        ...newGoals,
        startDate: monday.toISOString(),
        endDate: sunday.toISOString(),
        currentFocusMinutes: goals?.currentFocusMinutes || 0,
        currentTasks: goals?.currentTasks || 0,
        currentBreathingSessions: goals?.currentBreathingSessions || 0,
        streakCount: goals?.streakCount || 0,
      })
      .select()
      .single();

    if (error) {
      notify({
        type: 'error',
        message: 'Erro ao salvar metas',
        description: 'Tente novamente mais tarde',
      });
      return;
    }

    setGoals(data);
    setIsModalOpen(false);
    notify({
      type: 'success',
      message: 'Metas atualizadas com sucesso!',
      description: 'Continue focado para alcançá-las',
    });
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getMotivationalMessage = () => {
    if (!goals) return 'Defina suas metas para começar!';
    
    const totalProgress = (
      calculateProgress(goals.currentFocusMinutes, goals.focusMinutesGoal) +
      calculateProgress(goals.currentTasks, goals.tasksGoal) +
      calculateProgress(goals.currentBreathingSessions, goals.breathingSessionsGoal)
    ) / 3;

    if (totalProgress === 100) return '🏆 Parabéns! Você alcançou todas as suas metas!';
    if (totalProgress >= 75) return '🌟 Incrível! Você está quase lá!';
    if (totalProgress >= 50) return '💪 Metade do caminho! Continue assim!';
    if (totalProgress >= 25) return '🎯 Bom progresso! Mantenha o foco!';
    return '🚀 Você começou! Cada pequeno passo conta!';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Metas da Semana</h2>
        <p className="text-gray-600 dark:text-gray-400">Carregando metas...</p>
      </div>
    );
  }

  if (!goals) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Metas da Semana</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Nenhuma meta definida para esta semana.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Definir Metas
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Definir Metas da Semana"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Minutos de Foco
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                value={newGoals.focusMinutesGoal}
                onChange={(e) => setNewGoals(prev => ({
                  ...prev,
                  focusMinutesGoal: parseInt(e.target.value) || 0
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tarefas a Completar
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                value={newGoals.tasksGoal}
                onChange={(e) => setNewGoals(prev => ({
                  ...prev,
                  tasksGoal: parseInt(e.target.value) || 0
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Sessões de Respiração
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                value={newGoals.breathingSessionsGoal}
                onChange={(e) => setNewGoals(prev => ({
                  ...prev,
                  breathingSessionsGoal: parseInt(e.target.value) || 0
                }))}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSaveGoals}
              >
                Salvar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Metas da Semana</h2>
        <button
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Editar
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Tempo de Foco
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {goals.currentFocusMinutes}/{goals.focusMinutesGoal} min
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5 dark:bg-blue-700">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${
                calculateProgress(goals.currentFocusMinutes, goals.focusMinutesGoal) === 100
                ? 'bg-green-600'
                : 'bg-blue-600'
              }`}
              style={{ width: `${calculateProgress(goals.currentFocusMinutes, goals.focusMinutesGoal)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Tarefas Concluídas
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {goals.currentTasks}/{goals.tasksGoal}
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2.5 dark:bg-green-700">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${
                calculateProgress(goals.currentTasks, goals.tasksGoal) === 100
                ? 'bg-green-600'
                : 'bg-green-600'
              }`}
              style={{ width: `${calculateProgress(goals.currentTasks, goals.tasksGoal)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Sessões de Respiração
            </span>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {goals.currentBreathingSessions}/{goals.breathingSessionsGoal}
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2.5 dark:bg-purple-700">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${
                calculateProgress(goals.currentBreathingSessions, goals.breathingSessionsGoal) === 100
                ? 'bg-green-600'
                : 'bg-purple-600'
              }`}
              style={{ width: `${calculateProgress(goals.currentBreathingSessions, goals.breathingSessionsGoal)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {getMotivationalMessage()}
        </div>
        {goals.streakCount > 0 && (
          <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
            🔥 {goals.streakCount} {goals.streakCount === 1 ? 'semana' : 'semanas'} consecutivas alcançando as metas!
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Metas da Semana"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Minutos de Foco
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
              value={newGoals.focusMinutesGoal}
              onChange={(e) => setNewGoals(prev => ({
                ...prev,
                focusMinutesGoal: parseInt(e.target.value) || 0
              }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tarefas a Completar
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
              value={newGoals.tasksGoal}
              onChange={(e) => setNewGoals(prev => ({
                ...prev,
                tasksGoal: parseInt(e.target.value) || 0
              }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Sessões de Respiração
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
              value={newGoals.breathingSessionsGoal}
              onChange={(e) => setNewGoals(prev => ({
                ...prev,
                breathingSessionsGoal: parseInt(e.target.value) || 0
              }))}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleSaveGoals}
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
