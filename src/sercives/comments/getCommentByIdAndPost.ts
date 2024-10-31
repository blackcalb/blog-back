import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes, RecordPost } from "@/types";

export default async function getCommentByIdAndPost(
  postId: string,
  commentId: string
): Promise<RecordPost> {
  const { error, data: post } = await supabase
    .from("Comment")
    .select()
    .eq("id", commentId)
    .eq("post_id", postId)
    .limit(1);

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  if (!post?.length) {
    throw new Error(ErrorTypes.NOT_FOUND);
  }

  return post[0];
}
