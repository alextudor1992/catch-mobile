import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { Comment } from "./comment";
import { Post, PostStatus } from "../post";
import { v4 as uuid } from "uuid";
import { Store } from "../store";
import { formatDate } from "../../utils/date";
import { INITIAL_SCORE_UNVERIFIED_ACCOUNT, StoreInterface } from "../common";

export class CommentStore implements StoreInterface {
  @observable @persist('list', Comment)
  readonly comments = observable.array<Comment>([]);

  constructor(protected store: Store) {}

  createComment = (post: Post, parentComment?: Comment) => {
    if (this.store.profileStore.getCurrentProfile()?.isGhost) {
      throw new Error('Guest profile cannot publish comments');
    }
    if (post.status !== PostStatus.PUBLISHED) {
      throw new Error('Cannot publish comment on an unpublished post');
    }
    if (!post.settings.commentsAllowed) {
      throw new Error('Comments are not allowed on post');
    }

    const comment = new Comment();
    comment.commentId = uuid();
    comment.authorId = this.store.profileStore.activeProfile;
    comment.postId = post.postId;
    comment.parentCommentId = parentComment?.parentCommentId;

    if (!this.store.accountStore.isVerified) {
      comment.score.globalScore = INITIAL_SCORE_UNVERIFIED_ACCOUNT;
    }
    return comment;
  }

  @action
  publishComment = (comment: Comment) => {
    comment.timestamps.created = formatDate();

    if (this.canPublish(comment)) {
      if (comment.parentCommentId) {
        const parentComment = this.getComment(comment.parentCommentId);
        parentComment?.replies.push(comment.commentId);
      }
      this.comments.push(comment);
    }
  }

  @action
  updateComment = (comment: Comment) => {
    if (this.canPublish(comment)) {
      comment.timestamps.updated = formatDate();
    }
  }

  canPublish = (comment: Comment) => comment.commentText.length;

  @action
  removeComment = (comment: Comment) => {
    const { activeProfile } = this.store.profileStore;
    if (comment.authorId === activeProfile || this.store.postStore.getPost(comment.postId)?.authorId === activeProfile) {
      this.comments.remove(comment);
      this.store.emotionStore.destroyReferences(comment.commentId);
      this.destroyReferences(comment);
    }
  }

  @computed
  hasReplies = (comment: Comment) => comment.engagement.comments;

  protected updateEntityCommentsStats = (entity: Post | Comment) => {
    if (entity instanceof Post) {
      let count = 0;
      this.comments.forEach(({postId} : Comment) => postId === entity.postId && count++);
      entity.engagement.comments = count;
    }
    else if (entity instanceof Comment) {
      entity.engagement.comments = entity.replies.length;
    }
  }

  @action
  destroyReferences = entity => {
    const entityId = this.getEntityId(entity);

    if (entity instanceof Post) {
      this.comments.map(comment => {
        if (comment.postId === entityId) {
          this.store.emotionStore.destroyReferences(comment.commentId);
        }
      });

      this.comments.replace(this.comments.filter(({postId}: Comment) => postId !== entity.postId));
    }
    else if (entity instanceof Comment) {
      const processedComments = new Set([entity]);
      entity.replies.forEach(commentReplyId => {
          const replyComment = this.getComment(commentReplyId);

          if (replyComment) {
            processedComments.add(replyComment);
            this.store.emotionStore.destroyReferences(commentReplyId);
          }
      });

      this.comments.replace(this.comments.filter(comment => !processedComments.has(comment)));
    }
  }

  @computed
  getComment = (commentId: string) => this.comments.find(({ commentId: targetCommentId }) => targetCommentId === commentId);

  @computed
  protected getEntityId = (entity: Post | Comment) => {
    if (entity instanceof Post) {
      return entity.postId;
    } else if (entity instanceof Comment) {
      return entity.commentId;
    }
    throw new Error('Entity must be an instance of Post or Comment');
  }

  @action
  clearStore = () => {
    this.comments.clear();
  }
}
