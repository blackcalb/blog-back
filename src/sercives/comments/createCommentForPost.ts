import { supabase } from "@/lib/supabaseClient";
import { ErrorComment } from "@/types";

export default async function createCommentForPost(data: {
  content: string;
  post_id: string;
  created_by: string;
}) {
  const { error, data: comment } = await supabase
    .from("Comment")
    .insert(data)
    .select();

  if (error || !comment.length) {
    console.log("🚀 ~ error:", error);
    throw new Error(ErrorComment.CREATING);
  }

  return comment[0];
}
