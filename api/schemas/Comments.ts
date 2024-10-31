import { z } from "zod";

export const SchemaUpdateComment = z.object({
  content: z.string().min(1),
});

export type UpdateCommentDTO = z.infer<typeof SchemaUpdateComment>;

export const SchemaCreateComment = z.object({
  content: z.string().min(1),
  post_id: z.string(),
  created_by: z.string(),
});

export type CreateCommentDTO = z.infer<typeof SchemaCreateComment>;
