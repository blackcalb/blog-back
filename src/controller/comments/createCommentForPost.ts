import createCommentForPost from "@/sercives/comments/createCommentForPost";
import handleError from "@/utils/handleErrors";
import { Response, Request } from "express";

export default async function createCommmetForPostController(
  req: Request<
    { postId: string },
    any,
    {
      content: string;
    }
  >,
  res: Response
) {
  const { postId } = req.params;

  const data = req.body;

  try {
    const userId = req.user?.id ?? "";
    const comment = await createCommentForPost({
      ...data,
      post_id: postId,
      created_by: userId,
    });
    res.status(200).send(comment);
  } catch (error) {
    handleError(error, res);
  }
}
