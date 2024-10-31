import { Database } from "./database.types";

export type RecordPost = Database["public"]["Tables"]["Post"]["Row"];
export type RecordComment = Database["public"]["Tables"]["Comment"]["Row"];

export type RecordPostWithCounterComments = RecordPost & {
  total_comments: number;
};

export enum ErrorTypes {
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  FORBIDDEN = "FORBIDDEN",
}

export enum ErrorPost {
  UPDATING = "Error updating post",
  DELETING = "Error deleting post",
  CREATING = "Error creating post",
}

export enum ErrorComment {
  CREATING = "Error creating comment",
  DELETING = "Error deleting comment",
  UPDATING = "Error updating comment",
}
