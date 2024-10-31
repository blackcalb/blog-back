import { SchemaUpdateComment, UpdateCommentDTO } from "@/schemas/Comments";
import getCommentByIdAndPost from "@/sercives/comments/getCommentByIdAndPost";
import updateCommentFromPost from "@/sercives/comments/updateCommentFromPost";
import { ErrorTypes, PostIdAndCommentIdParam } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

export default async function updateCommentFromPostController(
  req: Request<PostIdAndCommentIdParam, any, UpdateCommentDTO>,
  res: Response
): Promise<void> {
  const { postId, commentId } = req.params;

  const data = req.body;
  const cleanedData = SchemaUpdateComment.safeParse(data);

  if (!cleanedData.success) {
    res.status(400).send({
      message: "BAD_REQUEST",
      errors: cleanedData.error.format(),
    });
    return;
  }

  try {
    const comment = await getCommentByIdAndPost(postId, commentId);

    if (req.user?.id !== comment.created_by) {
      throw new Error(ErrorTypes.FORBIDDEN);
    }

    const newComment = await updateCommentFromPost(commentId, cleanedData.data);

    res.status(200).send(newComment);
  } catch (error) {
    handleError(error, res);
  }
}
