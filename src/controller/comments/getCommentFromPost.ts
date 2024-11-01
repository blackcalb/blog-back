import getCommentFromPost from "@/sercives/comments/getCommentFromPost";
import { PostIdAndCommentIdParam, RecordComment } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function getCommentFromPostController(
  req: Request<PostIdAndCommentIdParam>,
  res: Response<RecordComment>
) {
  const { postId, commentId } = req.params;

  try {
    const comment = await getCommentFromPost(postId, commentId);

    res.status(200).send(comment);
  } catch (error) {
    handleError(error, res);
  }
}
