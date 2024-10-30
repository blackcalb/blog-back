import { Database } from "./database.types";

export type RecordPost = Database["public"]["Tables"]["Post"]["Row"];

export type RecordPostWithCounterComments = RecordPost & {
  total_comments: number;
};

export enum ErrorTypes {
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export enum ErrorPost {
  UPDATING = "Error updating post",
  DELETING = "Error deleting post",
  CREATING = "Error creating post",
}
