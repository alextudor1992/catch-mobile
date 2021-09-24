import { computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import {
  DEFAULT_POST_SETTINGS,
  PostSettings,
  PostStatus
} from "./types";
import { DEFAULT_ENGAGEMENT_STATS, EngagementStats } from "../emotion/types";
import {
  ContentSegment,
  DEFAULT_MEDIA_INFO,
  DEFAULT_SCORE,
  DEFAULT_SYNC_INFO, DEFAULT_TIMESTAMPS_INFO,
  MediaInfo,
  Score,
  SyncInfo, TimestampsInfo
} from "../common";

export class Post {
  @observable @persist
  postId: string = "";

  @observable @persist
  authorId: string = "";

  @observable @persist
  readonly mediaUrl = observable.object<MediaInfo>(DEFAULT_MEDIA_INFO);

  @observable @persist('list')
  readonly description = observable.array<ContentSegment>([]);

  @observable @persist("object")
  readonly settings = observable.object<PostSettings>(DEFAULT_POST_SETTINGS);

  @observable @persist("object")
  readonly engagement = observable.object<EngagementStats>(DEFAULT_ENGAGEMENT_STATS);

  @observable @persist
  status: PostStatus = PostStatus.PENDING;

  @observable @persist
  dateCreated?: string;

  @observable @persist
  dateUpdated?: string;

  @observable @persist('object')
  readonly score = observable.object<Score>(DEFAULT_SCORE);

  @observable @persist('object')
  readonly syncInfo = observable.object<SyncInfo>(DEFAULT_SYNC_INFO);

  @observable @persist('object')
  readonly timestamps = observable.object<TimestampsInfo>(DEFAULT_TIMESTAMPS_INFO);

  constructor() {
    makeObservable(this);
  }

  @computed
  getEmotionStats = () => this.engagement.emotions;

  @computed
  getCommentsCount = () => this.engagement.comments;

  @computed
  acceptsComments = () => this.status === PostStatus.PUBLISHED && this.settings.commentsAllowed;
}
