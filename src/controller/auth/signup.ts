import { Request, Response } from "express";
import createAuthUser from "src/sercives/auth/createAuthUser";

export default async function signupController(
  req: Request<any, { email: string; password: string }>,
  res: Response
): Promise<void> {
  try {
    const body = req.body;

    //TODO: validate body

    await createAuthUser(body.email, body.password);

    res.status(200).send("User created");
  } catch (error) {
    res.status(400).send("Fail to sign user up");
  }
}
