import { supabase } from "../../lib/supabase";

export async function handleRegister({
  provider,
  firstName,
  lastName,
  email,
  password,
  onSuccess,
}) {
  const result =
    provider === "google"
      ? await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/dashboard` },
        })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { firstName, lastName },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

  if (result.error) {
    throw result.error;
  }

  onSuccess?.(result.data);

  return {
    ...result.data,
    requiresEmailConfirmation: !result.data.session,
  };
}
