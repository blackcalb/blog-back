import deleteCommentFromPost from "@/sercives/comments/deleteCommentFromPost";
import getCommentByIdAndPost from "@/sercives/comments/getCommentByIdAndPost";
import updateCommentFromPost from "@/sercives/comments/updateCommentFromPost";
import { ErrorTypes } from "@/types";
import handleError from "@/utils/handleErrors";
import { Response, Request } from "express";

export default async function updateCommentFromPostController(
  req: Request<{ postId: string; commentId: string }, any, { content: string }>,
  res: Response
): Promise<void> {
  const { postId, commentId } = req.params;
  const data = req.body;

  try {
    const comment = await getCommentByIdAndPost(postId, commentId);

    if (req.user?.id !== comment.created_by) {
      res.status(403).send(ErrorTypes.FORBIDDEN);
      return;
    }

    const newComment = await updateCommentFromPost(commentId, data);

    res.status(200).send(newComment);
  } catch (error) {
    handleError(error, res);
  }
}
