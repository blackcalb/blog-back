import { supabase } from "@/lib/supabaseClient";
import { ErrorPost } from "@/types";

export default async function updatePost(
  postId: string,
  newData: Partial<{ title: string; content: string }>
) {
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
