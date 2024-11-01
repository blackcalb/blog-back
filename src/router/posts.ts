import createCommmetForPostController from "@/controller/comments/createCommentForPost";
import deleteCommentFromPostController from "@/controller/comments/deleteCommentFromPost";
import getAllCommentsFromPostController from "@/controller/comments/getAllCommentsFromPost";
import getCommentFromPostController from "@/controller/comments/getCommentFromPost";
import updateCommentFromPostController from "@/controller/comments/updateCommentFromPost";
import createPostController from "@/controller/posts/createPost.controller";
import deletePostController from "@/controller/posts/deletePost.controller";
import getAllPostsControllerasync from "@/controller/posts/getAllPost.controller";
import getPostController from "@/controller/posts/getPost.controller";
import putPostController from "@/controller/posts/putPost.controller";
import AuthMiddleware from "@/middlewares/auth";
import { PostIdAndCommentIdParam, PostIdParam } from "@/types";
import { Router } from "express";

export const postRouter = Router();

postRouter
  .route("/")
  .get(getAllPostsControllerasync)
  .post(AuthMiddleware, createPostController);

postRouter
  .route("/:postId")
  .get(getPostController)
  .put(AuthMiddleware<PostIdParam>, putPostController)
  .delete(AuthMiddleware<PostIdParam>, deletePostController);

postRouter
  .route("/:postId/comments")
  .get(getAllCommentsFromPostController)
  .post(AuthMiddleware<PostIdParam>, createCommmetForPostController);

postRouter
  .route("/:postId/comments/:commentId")
  .get(getCommentFromPostController)
  .put(AuthMiddleware<PostIdAndCommentIdParam>, updateCommentFromPostController)
  .delete(
    AuthMiddleware<PostIdAndCommentIdParam>,
    deleteCommentFromPostController
  );
