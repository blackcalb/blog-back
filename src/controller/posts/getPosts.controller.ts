import getPosts from "@/sercives/posts/getAllPost";
import getCountPosts from "@/sercives/posts/getCountPosts";
import { ErrorTypes, PaginateResponse, RecordPost } from "@/types";
import handleError from "@/utils/handleErrors";
import { Request, Response } from "express";

//TODO: add pagination
export default async function getPostsControllerasync(
  req: Request<any, any, any, { offset: string; limit: string }>,
  res: Response<PaginateResponse<RecordPost>>
): Promise<void> {
  try {
    const { offset = 0, limit = 10 } = req.query;

    try {
      Number(offset);
      Number(limit);
    } catch (error) {
      throw new Error(ErrorTypes.BAD_REQUEST);
    }
    const offsetN = Number(offset);
    const limitN = Number(limit);

    if (offsetN < 0 || limitN < 0) {
      throw new Error(ErrorTypes.BAD_REQUEST);
    }
    const totalPosts = await getCountPosts();

    const posts = await getPosts({ offset: offsetN, limit: limitN });
    res
      .send({
        offset: offsetN,
        limit: limitN,
        total: totalPosts,
        content: posts,
      })
      .status(200);
  } catch (error) {
    handleError(error, res);
  }
}
