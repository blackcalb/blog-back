import { Router } from "express";
import signupController from "@/controller/auth/signup";
import loginController from "@/controller/auth/loginController";

export const authRouter = Router();

authRouter.route("/signup").post(signupController);
authRouter.route("/login").post(loginController);
