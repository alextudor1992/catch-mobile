import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { CommentStatus } from "./types";
import { DEFAULT_ENGAGEMENT_STATS, EngagementStats } from "../emotion/types";
import {
  ContentSegment,
  DEFAULT_SCORE,
  DEFAULT_SYNC_INFO,
  DEFAULT_TIMESTAMPS_INFO,
  Score,
  SyncInfo,
  TimestampsInfo
} from "../common";

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
  status: CommentStatus = CommentStatus.PENDING;

  @observable @persist("object")
  readonly engagement = observable.object<EngagementStats>(DEFAULT_ENGAGEMENT_STATS);

  @observable @persist('list')
  readonly replies = observable.array<string>([]);

  @observable @persist('object')
  readonly score = observable.object<Score>(DEFAULT_SCORE);

  @observable @persist('object')
  readonly syncInfo = observable.object<SyncInfo>(DEFAULT_SYNC_INFO);

  @observable @persist('object')
  readonly timestamps = observable.object<TimestampsInfo>(DEFAULT_TIMESTAMPS_INFO);

  constructor() {
    makeObservable(this);
  }
}
