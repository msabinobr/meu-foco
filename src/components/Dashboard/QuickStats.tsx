"use client";

import { useUserProgress } from '@/lib/useUserProgress';

export default function QuickStats() {
  const progress = useUserProgress();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Tarefas Totais"
        value={progress.totalTasks}
        icon="📝"
      />
      <StatCard 
        title="Tarefas Concluídas"
        value={progress.completedTasks}
        icon="✅"
      />
      <StatCard 
        title="Nível Mágico"
        value={progress.level}
        icon="⭐"
      />
      <StatCard 
        title="Pontos Mágicos"
        value={progress.magicPoints}
        icon="✨"
      />
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
