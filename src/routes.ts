import { Application } from "express";
import { authRouter } from "./router/auth";
import bodyParser from "body-parser";
import AuthMiddleware from "./middlewares/auth";
import { userRouter } from "./router/user";
import { postRouter } from "./router/posts";

export default function routes(app: Application) {
  const jsonParser = bodyParser.json();

  app.use("/auth", jsonParser, authRouter);
  app.use("/user", jsonParser, AuthMiddleware, userRouter);
  app.use("/api/posts", jsonParser, postRouter);
}
