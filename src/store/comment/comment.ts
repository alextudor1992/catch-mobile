import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { CommentStatus } from "../../type/comment";
import { DEFAULT_ENGAGEMENT_STATS, EngagementStats } from "../../type/engagement";
import { ContentSegment } from "../../type/common";

export class Comment {
  @observable @persist
  commentId: string = '';

  @observable @persist
  authorId: string = '';

  @observable @persist
  postId: string = '';

  @observable @persist
  parentCommentId?: string;

  @observable @persist
  isPinned: boolean = false;

  @observable @persist('list')
  readonly commentText = observable.array<ContentSegment>([]);

  @observable @persist
  dateCreated?: string;

  @observable @persist
  dateUpdated?: string;

  @observable @persist
  status?: CommentStatus;

  @observable @persist("object")
  readonly engagement = observable.object<EngagementStats>(DEFAULT_ENGAGEMENT_STATS);

  @observable @persist('list')
  readonly replies = observable.array<string>([]);

  @observable @persist
  lastSync?: string;

  constructor() {
    makeObservable(this);
  }
}
