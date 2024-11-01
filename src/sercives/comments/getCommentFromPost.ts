import { supabase } from "@/lib/supabaseClient";
import { CommentId, ErrorTypes, PostId, RecordComment } from "@/types";

export default async function getCommentFromPost(
  postId: PostId,
  commentId: CommentId
): Promise<RecordComment> {
  const { error, data } = await supabase
    .from("Comment")
    .select()
    .eq("post_id", postId)
    .eq("id", commentId);

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  if (!data || data.length === 0) {
    throw new Error(ErrorTypes.NOT_FOUND);
  }

  return data[0];
}
