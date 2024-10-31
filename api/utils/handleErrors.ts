import { ErrorTypes } from "@/types";
import { Response } from "express";

function getErrorCode(error: any): number {
  if (error.message === ErrorTypes.INTERNAL_ERROR) {
    return 500;
  }
  if (error.message === ErrorTypes.NOT_FOUND) {
    return 404;
  }
  if (error.message === ErrorTypes.FORBIDDEN) {
    return 403;
  }
  return 400;
}

export default function handleError(error: any, res: Response) {
  const errorCode = getErrorCode(error);
  res.status(errorCode).send({ message: error.message });
}
