import { supabase } from "@/lib/supabaseClient";
import { ErrorTypes } from "@/types";
import { Request, Response, NextFunction } from "express";

export default async function AuthMiddleware<T>(
  req: Request<{ authorization: string } & T>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send(ErrorTypes.UNAUTHORIZED);
    return;
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    res.status(401).send(ErrorTypes.UNAUTHORIZED);
    return;
  }

  req.user = {
    id: data.user.id,
    email: data.user.email,
  };
  return next();
}
