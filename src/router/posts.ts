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
  .get((req, res) => {
    res.send("WIP").status(501);
  })
  .post((req, res) => {
    res.send("WIP").status(501);
  })
  .delete((req, res) => {
    res.send("WIP").status(501);
  });

postRouter
  .route("/:postId/comments/:commentId")
  .put((req, res) => {
    res.send("WIP").status(501);
  })
  .delete((req, res) => {
    res.send("WIP").status(501);
  });
