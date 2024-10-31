import deleteCommentFromPost from "@/sercives/comments/deleteCommentFromPost";
import getCommentByIdAndPost from "@/sercives/comments/getCommentByIdAndPost";
import { ErrorTypes, PostIdAndCommentIdParam } from "@/types";
import handleError from "@/utils/handleErrors";
import { Response, Request } from "express";

export default async function deleteCommentFromPostController(
  req: Request<PostIdAndCommentIdParam>,
  res: Response
): Promise<void> {
  const { postId, commentId } = req.params;

  try {
    const comment = await getCommentByIdAndPost(postId, commentId);

    if (req.user?.id !== comment.created_by) {
      throw new Error(ErrorTypes.FORBIDDEN);
    }

    await deleteCommentFromPost(commentId);

    res.status(200).send();
  } catch (error) {
    handleError(error, res);
  }
}
