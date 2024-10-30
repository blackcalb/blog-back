import deletePost from "@/sercives/posts/deletePost";
import getPostById from "@/sercives/posts/getPostById";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function deletePostController(
  req: Request,
  res: Response
) {
  const { postId } = req.params;
  try {
    const post = await getPostById(postId);

    if (req.user?.id !== post.created_by) {
      res.status(403).send("Forbidden");
      return;
    }
    await deletePost(postId);

    res.send().status(200);
  } catch (error: any) {
    handleError(error, res);
  }
}
