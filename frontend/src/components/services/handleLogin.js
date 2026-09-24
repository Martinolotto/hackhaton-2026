import { supabase } from "../../lib/supabase";

export async function handleLogin({ provider, email, password, onSuccess }) {
  const result =
    provider === "google"
      ? await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/dashboard` },
        })
      : await supabase.auth.signInWithPassword({ email, password });

  if (result.error) {
    throw result.error;
  }

  onSuccess?.(result.data);
  return result.data;
}
