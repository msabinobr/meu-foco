"use client";

import { useState } from 'react';
import WelcomeMessage from "@/components/Dashboard/WelcomeMessage";
import DailyWisdom from "@/components/Dashboard/DailyWisdom";
import QuickStats from "@/components/Dashboard/QuickStats";
import MissionMode from "@/components/Dashboard/MissionMode";
import BreathingGame from "@/components/Dashboard/BreathingGame";
import PomodoroTimer from "@/components/PomodoroTimer";
import DailyHistory from "@/components/Dashboard/DailyHistory";
import WeeklyGoals from "@/components/Dashboard/WeeklyGoals";

type View = 'missions' | 'breathing' | 'pomodoro';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>('missions');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda */}
        <div className="lg:col-span-2 space-y-8">
          <WelcomeMessage />
          <DailyWisdom />
          <QuickStats />
          
          {/* Área principal com navegação por tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveView('missions')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeView === 'missions'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                Missões <span className="ml-2">🎯</span>
              </button>
              <button
                onClick={() => setActiveView('breathing')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeView === 'breathing'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                Respiração <span className="ml-2">🌬️</span>
              </button>
              <button
                onClick={() => setActiveView('pomodoro')}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeView === 'pomodoro'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                Pomodoro <span className="ml-2">⏱️</span>
              </button>
            </div>

            <div className="p-6">
              {activeView === 'missions' && <MissionMode />}
              {activeView === 'breathing' && <BreathingGame />}
              {activeView === 'pomodoro' && <PomodoroTimer />}
            </div>
          </div>
        </div>

        {/* Coluna da Direita - Estatísticas e Metas */}
        <div className="space-y-8">
          <DailyHistory />
          <WeeklyGoals />
        </div>
      </div>
    </div>
  );
}
