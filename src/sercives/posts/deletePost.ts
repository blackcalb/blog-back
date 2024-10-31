import { supabase } from "@/lib/supabaseClient";
import { ErrorPost, PostId } from "@/types";

export default async function deletePost(postId: PostId) {
  const { error } = await supabase.from("Post").delete().eq("id", postId);

  if (error) {
    throw new Error(ErrorPost.DELETING);
  }
}
