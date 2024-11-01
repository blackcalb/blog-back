import { Request, Response } from "express";
import createAuthUser from "src/sercives/auth/createAuthUser";

export default async function signupController(
  req: Request<any, { email: string; password: string }>,
  res: Response
): Promise<void> {
  try {
    const body = req.body;
    console.log("🚀 ~ body:", body);

    //TODO: validate body

    const user = await createAuthUser(body.email, body.password);
    console.log("🚀 ~ user:", user);

    res.status(201).send({ message: "User created" });
  } catch (error: any) {
    console.log("🚀 ~ error:", error.code);
    if (error.code === "user_already_exists") {
      res.status(400).send({
        code: "user_already_exists",
        message: "Email already in use.",
      });
      return;
    }
    if (error.code === "weak_password") {
      res.status(400).send({
        code: "weak_password",
        message: "Password is too weak",
      });
      return;
    }
    res.status(400).send({ message: "Fail to sign user up" });
  }
}
