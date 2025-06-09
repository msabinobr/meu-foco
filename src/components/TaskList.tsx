"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Task {
  id: number;
  texto_tarefa: string;
  esta_completa: boolean;
  created_at: string;
}

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");

  // Adicionar nova tarefa
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { data, error } = await supabase
      .from("tarefas")
      .insert([{ texto_tarefa: newTask.trim(), esta_completa: false }])
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar tarefa:", error);
      return;
    }

    setTasks([...tasks, data]);
    setNewTask("");
  };

  // Alternar estado de uma tarefa
  const toggleTask = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const { error } = await supabase
      .from("tarefas")
      .update({ esta_completa: !task.esta_completa })
      .eq("id", taskId);

    if (error) {
      console.error("Erro ao atualizar tarefa:", error);
      return;
    }

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, esta_completa: !t.esta_completa } : t
    ));
  };

  // Deletar tarefa
  const deleteTask = async (taskId: number) => {
    const { error } = await supabase
      .from("tarefas")
      .delete()
      .eq("id", taskId);

    if (error) {
      console.error("Erro ao deletar tarefa:", error);
      return;
    }

    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <input
              type="checkbox"
              checked={task.esta_completa}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
            />
            <span
              className={`flex-1 ${
                task.esta_completa ? "line-through text-gray-500" : ""
              }`}
            >
              {task.texto_tarefa}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
