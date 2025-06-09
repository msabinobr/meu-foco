"use client";

import { useEffect, useState } from 'react';
import { DailyStats, getDailyStats } from '@/lib/stats';

export default function DailyHistory() {
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await getDailyStats();
      setStats(data);
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Histórico do Dia</h2>
        <p className="text-gray-600 dark:text-gray-400">Carregando estatísticas...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Histórico do Dia</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm text-blue-600 dark:text-blue-400">Tempo Focado</div>
          <div className="text-2xl font-bold">{stats.focusMinutes} min</div>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-sm text-green-600 dark:text-green-400">Tarefas Concluídas</div>
          <div className="text-2xl font-bold">{stats.tasksCompleted}</div>
        </div>
        
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-sm text-purple-600 dark:text-purple-400">Sessões de Respiração</div>
          <div className="text-2xl font-bold">{stats.breathingSessions}</div>
        </div>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-sm text-yellow-600 dark:text-yellow-400">Ciclos Pomodoro</div>
          <div className="text-2xl font-bold">{stats.pomodoroCycles}</div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="text-sm text-red-600 dark:text-red-400">Sequência de Dias</div>
        <div className="text-2xl font-bold flex items-center gap-2">
          {stats.streak} dias
          {stats.streak > 0 && <span className="text-xl">🔥</span>}
        </div>
      </div>
    </div>
  );
}
