import createCommmetForPostController from "@/controller/comments/createCommentForPost";
import deleteCommentFromPostController from "@/controller/comments/deleteCommentFromPost";
import getAllCommentsFromPostController from "@/controller/comments/getAllCommentsFromPost";
import updateCommentFromPostController from "@/controller/comments/updateCommentFromPost";
import createPostController from "@/controller/posts/createPost.controller";
import deletePostController from "@/controller/posts/deletePost.controller";
import getAllPostsControllerasync from "@/controller/posts/getAllPost.controller";
import getPostController from "@/controller/posts/getPost.controller";
import putPostController from "@/controller/posts/putPost.controller";
import AuthMiddleware from "@/middlewares/auth";
import { Router } from "express";

export const postRouter = Router();

postRouter
  .route("/")
  .get(getAllPostsControllerasync)
  .post(AuthMiddleware, createPostController);

postRouter
  .route("/:postId")
  .get(getPostController)
  .put(AuthMiddleware<{ postId: string }>, putPostController)
  .delete(AuthMiddleware<{ postId: string }>, deletePostController);

postRouter
  .route("/:postId/comments")
  .get(getAllCommentsFromPostController)
  .post(AuthMiddleware<{ postId: string }>, createCommmetForPostController);

postRouter
  .route("/:postId/comments/:commentId")
  .put(
    AuthMiddleware<{ postId: string; commentId: string }>,
    updateCommentFromPostController
  )
  .delete(
    AuthMiddleware<{ postId: string; commentId: string }>,
    deleteCommentFromPostController
  );
