import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

let supabaseClient;

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(env.supabaseUrl, env.supabasePublishableKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

export function getSupabaseClaims(token) {
  return getSupabaseClient().auth.getClaims(token);
}
