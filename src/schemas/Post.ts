import { z } from "zod";

export const SchemaUpdatePost = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .refine(
    (data) => {
      for (const val of Object.values(data)) {
        if (val !== undefined) return true;
      }
      return false;
    },
    {
      message: "Must provide at least one field to update",
    }
  );

export type UpdatePostDTO = z.infer<typeof SchemaUpdatePost>;

export const SchemaCreatePost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  created_by: z.string(),
});

export type CreatePostDTO = z.infer<typeof SchemaCreatePost>;
