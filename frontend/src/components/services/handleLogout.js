import { supabase } from "../../lib/supabase";

export async function handleLogout(onLogout) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  onLogout?.();
}
