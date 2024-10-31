import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes, PostId, RecordComment } from "@/types";

export default async function getAllCommentsFromPost(
  postId: PostId
): Promise<RecordComment[]> {
  const { error, data } = await supabase
    .from("Comment")
    .select()
    .eq("post_id", postId);

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  return data;
}
