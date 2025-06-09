import { supabase } from "@/lib/supabase";

export async function listTasks(limit = 10) {
  const { data, error } = await supabase
    .from("tarefas")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return data || [];
}
