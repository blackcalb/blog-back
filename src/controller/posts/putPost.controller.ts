import { CreatePostDTO, SchemaUpdatePost } from "@/schemas/Post";
import getPostById from "@/sercives/posts/getPostById";
import updatePost from "@/sercives/posts/updatePost";
import { ErrorTypes, PostIdParam } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function putPostController(
  req: Request<PostIdParam, any, Omit<CreatePostDTO, "created_by">>,
  res: Response
) {
  const { postId } = req.params;
  const userId = req.user?.id ?? "";
  try {
    const post = await getPostById(postId);

    if (userId !== post.created_by) {
      throw new Error(ErrorTypes.FORBIDDEN);
    }

    const data = { ...req.body, created_by: userId };
    const cleanedData = SchemaUpdatePost.safeParse(data);

    if (!cleanedData.success) {
      res.status(400).send({
        message: ErrorTypes.BAD_REQUEST,
        errors: cleanedData.error.format(),
      });
      return;
    }

    const postUpdated = await updatePost(postId, cleanedData.data);

    res.send(postUpdated).status(200);
  } catch (error: any) {
    handleError(error, res);
  }
}
