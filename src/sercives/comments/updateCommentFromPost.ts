import { supabase } from "@/lib/supabaseClient";
import { ErrorComment, RecordComment } from "@/types";

export default async function updateCommentFromPost(
  commentId: string,
  data: { content: string }
): Promise<RecordComment> {
  const { error, data: comment } = await supabase
    .from("Comment")
    .update(data)
    .eq("id", commentId)
    .select();

  if (error || !comment.length) {
    throw new Error(ErrorComment.UPDATING);
  }

  return comment[0];
}
