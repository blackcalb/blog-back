import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes, PostId, RecordPostWithCounterComments } from "@/types";

export default async function getPostById(
  postId: PostId
): Promise<RecordPostWithCounterComments> {
  const { error, data: post } = await supabase
    .from("Post")
    .select("*, Comment(id)")
    .eq("id", postId)
    .limit(1);

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  if (!post?.length) {
    throw new Error(ErrorTypes.NOT_FOUND);
  }

  return {
    ...post[0],
    total_comments: post[0].Comment.length,
  };
}
