import { action, observable } from "mobx";
import { persist } from "mobx-persist";
import { Comment } from "./comment";
import { Post } from "../post";
import { v4 as uuid } from 'uuid';
import { hydrate } from "../../store";
import { Account } from "../account";

export class CommentStore {

  constructor(protected account: Account) {}

  @observable @persist('map', [Comment])
  comments = observable.map<string, Comment[]>({});

  @action
  addComment = (post: Post, commentText: string) => {
    const comment = new Comment({
      commentId: uuid(),
      profileId: '',
      dateCreated: new Date(),
      commentText,
    });

    this.pushCommentToPostList(post.postId, comment);
  }

  @action
  replyToComment = (post: Post, parentComment: Comment, commentText: string) => {
    const comment = new Comment({
      commentId: uuid(),
      profileId: '',
      dateCreated: new Date(),
      parentCommentId: parentComment.commentId,
      commentText,
    });

    this.pushCommentToPostList(post.postId, comment);
  }

  @action
  removeComment = (post: Post, comment: Comment) => {
    const comments = this.comments.get(post.postId);
    const commentIndex = comments?.findIndex(postComment => postComment === comment);

    if (commentIndex !== undefined && commentIndex >= 0) {
      comments?.splice(commentIndex, 1);
    }
  }

  protected pushCommentToPostList = (postId: string, comment: Comment) => {
    if (!this.comments.has(postId)) {
      this.comments.set(postId, [comment]);
    }
    else this.comments.get(postId)?.push(comment);
  }
}

export const getCommentStore = async (account: Account) => await hydrate(`${account.currentProfile}_emotions`, new CommentStore(account));
