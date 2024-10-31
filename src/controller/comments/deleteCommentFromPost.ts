import deleteCommentFromPost from "@/sercives/comments/deleteCommentFromPost";
import getCommentByIdAndPost from "@/sercives/comments/getCommentByIdAndPost";
import { ErrorTypes } from "@/types";
import handleError from "@/utils/handleErrors";
import { Response, Request } from "express";

export default async function deleteCommentFromPostController(
  req: Request<{ postId: string; commentId: string }>,
  res: Response
): Promise<void> {
  const { postId, commentId } = req.params;

  try {
    const comment = await getCommentByIdAndPost(postId, commentId);

    if (req.user?.id !== comment.created_by) {
      res.status(403).send(ErrorTypes.FORBIDDEN);
      return;
    }

    await deleteCommentFromPost(commentId);

    res.status(200).send();
  } catch (error) {
    handleError(error, res);
  }
}
