import { supabase } from "@/lib/supabaseClient";
import { ErrorPost } from "@/types";

export default async function deletePost(postId: string) {
  const { error } = await supabase.from("Post").delete().eq("id", postId);

  if (error) {
    throw new Error(ErrorPost.DELETING);
  }
}
