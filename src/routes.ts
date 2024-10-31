import { Application, Request, Response } from "express";
import { authRouter } from "./router/auth";
import bodyParser from "body-parser";
import AuthMiddleware from "./middlewares/auth";
import { userRouter } from "./router/user";
import { postRouter } from "./router/posts";

export default function routes(app: Application) {
  const jsonParser = bodyParser.json();

  app.get("/", (req: Request, res: Response) => {
    res.send("👋");
  });
  app.use("/auth", jsonParser, authRouter);
  app.use("/user", jsonParser, AuthMiddleware, userRouter);
  app.use("/api/posts", jsonParser, postRouter);
}
