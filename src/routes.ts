import { Application } from "express";
import { authRouter } from "./router/auth";
import bodyParser from "body-parser";
import AuthMiddleware from "./middlewares/auth";
import { userRouter } from "./router/user";

export default function routes(app: Application) {
  const jsonParser = bodyParser.json();

  app.use("/auth", jsonParser, authRouter);
  app.use("/user", jsonParser, AuthMiddleware, userRouter);
}
