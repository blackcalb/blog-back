import getAllPosts from "@/sercives/posts/getAllPost";
import { RecordPost } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

//TODO: add pagination
//TODO: update type of errors
export default async function getAllPostsControllerasync(
  req: Request,
  res: Response<RecordPost[] | string>
): Promise<void> {
  //TODO: paginate this result
  try {
    const posts = await getAllPosts();
    res.send(posts).status(200);
  } catch (error) {
    handleError(error, res);
  }
}
