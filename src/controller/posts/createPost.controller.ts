import createPost from "@/sercives/posts/createPost";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function createPostController(
  req: Request<any, any, { title: string; content: string }>,
  res: Response
) {
  //TODO: validate body
  const data = req.body;
  try {
    const userId = req.user?.id ?? "";
    const post = await createPost({ ...data, created_by: userId });

    res.status(200).send(post);
  } catch (error) {
    handleError(error, res);
  }
}
