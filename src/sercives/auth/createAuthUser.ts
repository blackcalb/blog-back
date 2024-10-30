import { supabase } from "@/lib/supabaseClient";

export default async function createAuthUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    return data.user?.id;
  } catch (error) {
    throw error;
  }
}
