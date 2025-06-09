import { supabase } from "@/lib/supabase";

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  // Você pode buscar mais dados do usuário em uma tabela, se desejar
  return user;
}
