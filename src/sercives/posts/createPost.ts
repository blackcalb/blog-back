import { supabase } from "@/lib/supabaseClient";
import { CreatePostDTO } from "@/schemas/Post";
import { ErrorPost, RecordPost } from "@/types";

export default async function createPost(
  data: CreatePostDTO
): Promise<RecordPost> {
  const { error, data: newPost } = await supabase
    .from("Post")
    .insert(data)
    .select();

  if (error || !newPost.length) {
    console.log(error, newPost);
    throw new Error(ErrorPost.CREATING);
  }

  return newPost[0];
}
