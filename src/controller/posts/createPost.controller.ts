import { CreatePostDTO, SchemaCreatePost } from "@/schemas/Post";
import createPost from "@/sercives/posts/createPost";
import { ErrorTypes } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function createPostController(
  req: Request<any, any, Omit<CreatePostDTO, "created_by">>,
  res: Response
) {
  const userId = req.user?.id ?? "";
  const data = req.body;

  const cleanedData = SchemaCreatePost.safeParse({
    ...data,
    created_by: userId,
  });

  if (!cleanedData.success) {
    res.status(400).send({
      message: ErrorTypes.BAD_REQUEST,
      errors: cleanedData.error.format(),
    });
    return;
  }

  try {
    const post = await createPost(cleanedData.data);

    res.status(200).send(post);
  } catch (error) {
    handleError(error, res);
  }
}
