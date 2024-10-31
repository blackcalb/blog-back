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

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Fail to login");
  }
}
