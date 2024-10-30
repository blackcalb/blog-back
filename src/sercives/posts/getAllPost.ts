import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes, RecordPostWithCounterComments } from "@/types";

export default async function getAllPosts(): Promise<
  RecordPostWithCounterComments[]
> {
  const { error, data } = await supabase.from("Post").select("*, Comment(id)");

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }

  return data.map(({ Comment, ...props }) => ({
    ...props,
    total_comments: Comment.length,
  }));
}
