import { supabase } from "@/lib/supabaseClient";
import { ErrorPost, RecordPost } from "@/types";

export default async function createPost(data: {
  title: string;
  content: string;
  created_by: string;
}): Promise<RecordPost> {
  const { error, data: newPost } = await supabase
    .from("Post")
    .insert(data)
    .select();

  if (error || !newPost.length) {
    throw new Error(ErrorPost.CREATING);
  }

  return newPost[0];
}
