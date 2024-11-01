import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes } from "@/types";

export default async function getCountPosts(): Promise<number> {
  const { error, count } = await supabase
    .from("Post")
    .select("*", { count: "exact" });

  if (error || count === null) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  return count;
}
