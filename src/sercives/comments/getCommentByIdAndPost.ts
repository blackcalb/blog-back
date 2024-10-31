import { supabase } from "@/lib/supabaseClient";
import { CommentId, ErrorTypes, PostId, RecordComment } from "@/types";

export default async function getCommentByIdAndPost(
  postId: PostId,
  commentId: CommentId
): Promise<RecordComment> {
  const { error, data: comment } = await supabase
    .from("Comment")
    .select()
    .eq("id", commentId)
    .eq("post_id", postId)
    .limit(1);

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  if (!comment?.length) {
    throw new Error(ErrorTypes.NOT_FOUND);
  }

  return comment[0];
}
