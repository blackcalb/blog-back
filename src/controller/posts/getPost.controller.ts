import getPostById from "@/sercives/posts/getPostById";
import { PostIdParam, RecordPost } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function getPostController(
  req: Request<PostIdParam>,
  res: Response<RecordPost>
): Promise<void> {
  try {
    const { postId } = req.params;

    const post = await getPostById(postId);

    res.status(200).send(post);
  } catch (error: any) {
    handleError(error, res);
  }
}
