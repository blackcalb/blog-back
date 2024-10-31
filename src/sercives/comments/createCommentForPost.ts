import { supabase } from "@/lib/supabaseClient";
import { CreateCommentDTO } from "@/schemas/Comments";
import { ErrorComment, RecordComment } from "@/types";

export default async function createCommentForPost(
  data: CreateCommentDTO
): Promise<RecordComment> {
  const { error, data: comment } = await supabase
    .from("Comment")
    .insert(data)
    .select();

  if (error || !comment.length) {
    throw new Error(ErrorComment.CREATING);
  }

  return comment[0];
}
