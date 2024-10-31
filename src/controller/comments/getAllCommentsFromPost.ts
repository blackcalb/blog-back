import getAllCommentsFromPost from "@/sercives/comments/getAllCommentsFromPost";
import { PostIdParam, RecordComment } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function getAllCommentsFromPostController(
  req: Request<PostIdParam>,
  res: Response<RecordComment[]>
) {
  const { postId } = req.params;

  try {
    const comments = await getAllCommentsFromPost(postId);

    res.status(200).send(comments);
  } catch (error) {
    handleError(error, res);
  }
}
