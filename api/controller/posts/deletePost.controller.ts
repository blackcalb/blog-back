import deletePost from "@/sercives/posts/deletePost";
import getPostById from "@/sercives/posts/getPostById";
import { ErrorTypes, PostIdParam } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function deletePostController(
  req: Request<PostIdParam>,
  res: Response
) {
  const { postId } = req.params;
  try {
    const post = await getPostById(postId);

    if (req.user?.id !== post.created_by) {
      throw new Error(ErrorTypes.FORBIDDEN);
    }
    await deletePost(postId);

    res.send().status(200);
  } catch (error: any) {
    handleError(error, res);
  }
}
