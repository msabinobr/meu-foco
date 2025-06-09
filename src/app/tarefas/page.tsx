import { supabase } from "@/lib/supabase";
import TaskList from "@/components/TaskList";

async function getTarefas() {
  const { data } = await supabase
    .from("tarefas")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function TarefasPage() {
  const tarefas = await getTarefas();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Tarefas</h1>
      <TaskList initialTasks={tarefas} />
    </div>
  );
}
