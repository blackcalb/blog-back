import { Database } from "./database.types";

export type PostId = RecordPost["id"];
export type CommentId = RecordComment["id"];
export interface PostIdParam {
  postId: PostId;
}

export interface PostIdAndCommentIdParam {
  postId: PostId;
  commentId: CommentId;
}

export type RecordPost = Database["public"]["Tables"]["Post"]["Row"];
export type RecordComment = Database["public"]["Tables"]["Comment"]["Row"];

export type RecordPostWithCounterComments = RecordPost & {
  total_comments: number;
};

export enum ErrorTypes {
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  FORBIDDEN = "FORBIDDEN",
  UNAUTHORIZED = "UNAUTHORIZED",
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
