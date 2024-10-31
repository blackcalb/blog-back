import { supabase } from "@/lib/supabaseClient";
import { CommentId, ErrorComment } from "@/types";

export default async function deleteCommentFromPost(
  commentId: CommentId
): Promise<void> {
  const { error } = await supabase.from("Comment").delete().eq("id", commentId);

  if (error) {
    throw new Error(ErrorComment.DELETING);
  }
}
