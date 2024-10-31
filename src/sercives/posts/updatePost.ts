import { supabase } from "@/lib/supabaseClient";
import { UpdatePostDTO } from "@/schemas/Post";
import { ErrorPost, PostId, RecordPost } from "@/types";

export default async function updatePost(
  postId: PostId,
  newData: UpdatePostDTO
): Promise<RecordPost> {
  const { error, data } = await supabase
    .from("Post")
    .update(newData)
    .match({ id: postId })
    .select();

  if (error) {
    throw new Error(ErrorPost.UPDATING);
  }

  return data[0];
}
