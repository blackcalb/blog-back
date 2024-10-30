import { ErrorTypes } from "@/types";
import { Response } from "express";

export default function handleError(error: any, res: Response) {
  if (error.message === ErrorTypes.INTERNAL_ERROR) {
    res.status(500).send(error.message);
    return;
  }
  if (error.message === ErrorTypes.NOT_FOUND) {
    res.status(404).send(error.message);
    return;
  }
  res.status(400).send(error.message);
}
