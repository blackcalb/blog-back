import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes, RecordComment } from "@/types";

export default async function getAllCommentsFromPost(
  postId: string
): Promise<RecordComment[]> {
  const { error, data } = await supabase
    .from("Comment")
    .select()
    .eq("post_id", postId);

  if (error) {
    console.log("🚀 ~ error:", error);
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  return data;
}
