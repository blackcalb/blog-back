import { supabase } from "@/lib/supabaseClient";
import {
  ErrorTypes,
  RecordPostWithCounterComments,
  PaginationOptions,
} from "@/types";

export default async function getAllPosts({
  offset,
  limit,
}: PaginationOptions): Promise<RecordPostWithCounterComments[]> {
  const { error, data } = await supabase
    .from("Post")
    .select("*, Comment(id)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(ErrorTypes.INTERNAL_ERROR);
  }
  return data.map(({ Comment, ...props }) => ({
    ...props,
    total_comments: Comment.length,
  }));
}
