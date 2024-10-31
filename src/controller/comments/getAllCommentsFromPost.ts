import getAllCommentsFromPost from "@/sercives/comments/getAllCommentsFromPost";
import { RecordComment } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function getAllCommentsFromPostController(
  req: Request<{ postId: string }>,
  res: Response<RecordComment[]>
): Promise<void> {
  const { postId } = req.params;

  try {
    const comments = await getAllCommentsFromPost(postId);

    res.status(200).send(comments);
  } catch (error) {
    handleError(error, res);
  }
}
