import { Request, Response } from "express";
import login from "@/sercives/auth/login";

export default async function loginController(
  req: Request<any, { email: string; password: string }>,
  res: Response
): Promise<void> {
  const data = req.body;

  //TODO: validate body
  const { email, password } = data;

  try {
    const data = await login(email, password);

    if (!data) {
      res.status(400).send({
        code: "invalid_credentials",
        message: "Invalid credentials",
      });
      return;
    }

    res.status(200).send({
      auth_token: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal error, please try later",
    });
  }
}
