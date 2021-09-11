import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { CommentStatus } from "../../type/comment";

export class Comment {
  @observable @persist
  commentId: string;

  @observable @persist
  profileId: string;

  @observable @persist
  postId?: string;

  @observable @persist
  parentCommentId?: string;

  @observable @persist
  commentText: string;

  @observable @persist
  dateCreated: Date;

  @observable @persist
  dateUpdated?: Date;

  @observable @persist
  status?: CommentStatus;

  @observable @persist
  lastSync?: Date;

  constructor(data: Comment) {
    this.commentId = data.commentId;
    this.profileId = data.profileId;
    this.postId = data.postId;
    this.parentCommentId = data.parentCommentId;
    this.dateCreated = data.dateCreated;
    this.status = data.status ?? CommentStatus.UNKNOWN;
    this.lastSync = data.lastSync;
    this.commentText = data.commentText;

    makeObservable(this);
  }
}
