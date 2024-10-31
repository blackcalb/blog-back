import { CreateCommentDTO, SchemaCreateComment } from "@/schemas/Comments";
import createCommentForPost from "@/sercives/comments/createCommentForPost";
import { PostIdParam } from "@/types";
import handleError from "@/utils/handleErrors";
import { Response, Request } from "express";

export default async function createCommmetForPostController(
  req: Request<PostIdParam, any, Pick<CreateCommentDTO, "content">>,
  res: Response
) {
  const { postId } = req.params;
  const userId = req.user?.id ?? "";

  const data = {
    ...req.body,
    post_id: postId,
    created_by: userId,
  };
  const cleanedData = SchemaCreateComment.safeParse(data);

  if (!cleanedData.success) {
    res.status(400).send({
      message: "BAD_REQUEST",
      errors: cleanedData.error.format(),
    });
    return;
  }

  try {
    const comment = await createCommentForPost(cleanedData.data);
    res.status(200).send(comment);
  } catch (error) {
    handleError(error, res);
  }
}
