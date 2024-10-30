import getPostById from "@/sercives/posts/getPostById";
import updatePost from "@/sercives/posts/updatePost";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function putPostController(
  req: Request<{ postId: string }, any, { title: string; content: string }>,
  res: Response
) {
  const { postId } = req.params;
  try {
    const post = await getPostById(postId);

    //TODO: validate return of fn
    if (req.user?.id !== post.created_by) {
      res.status(403).send("Forbidden");
      return;
    }

    const data = req.body;
    const postUpdated = await updatePost(postId, data);

    res.send(postUpdated).status(200);
  } catch (error: any) {
    handleError(error, res);
  }
}
