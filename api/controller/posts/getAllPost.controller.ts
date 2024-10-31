import getAllPosts from "@/sercives/posts/getAllPost";
import { RecordPost } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

//TODO: add pagination
export default async function getAllPostsControllerasync(
  req: Request,
  res: Response<RecordPost[] | string>
): Promise<void> {
  try {
    const posts = await getAllPosts();
    res.send(posts).status(200);
  } catch (error) {
    handleError(error, res);
  }
}
