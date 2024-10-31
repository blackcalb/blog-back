import { supabase } from "@/lib/supabaseClient";
import { UpdateCommentDTO } from "@/schemas/Comments";
import { CommentId, ErrorComment, RecordComment } from "@/types";

export default async function updateCommentFromPost(
  commentId: CommentId,
  data: UpdateCommentDTO
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
