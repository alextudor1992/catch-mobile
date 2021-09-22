import { computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import {
  ContentSegment,
  DEFAULT_POST_SETTINGS,
  PostSettings,
  PostStatus
} from "../../type/post";
import { DEFAULT_ENGAGEMENT_STATS, EngagementStats } from "../../type/engagement";

export class Post {
  @observable @persist
  postId: string = "";

  @observable @persist
  authorId: string = "";

  @observable @persist
  mediaUrl: string = "";

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

  @observable @persist
  lastSync?: string;

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
