import { computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import {
  ContentSegment,
  DEFAULT_MEDIA_INFO,
  DEFAULT_SCORE,
  DEFAULT_TIMESTAMPS_INFO,
  MediaInfo,
  Score,
  TimestampsInfo
} from "../common";

export const PROFILE_GUEST_ID = 'guest-profile-id';

export class Profile {
  @observable @persist
  profileId: string = PROFILE_GUEST_ID;

  @observable @persist
  handle: string = 'guest';

  @observable @persist
  name?: string;

  @observable @persist
  createdByAccountId: string = '';

  @observable @persist('list')
  readonly bio = observable.array<ContentSegment>([]);

  @observable @persist('object')
  readonly picture = observable.object<MediaInfo>(DEFAULT_MEDIA_INFO);

  @observable @persist('object')
  readonly timestamps = observable.object<TimestampsInfo>(DEFAULT_TIMESTAMPS_INFO);

  @observable @persist
  enabled: boolean = true;

  @observable @persist('object')
  readonly score = observable.object<Score>(DEFAULT_SCORE);

  constructor() {
    makeObservable(this);
  }

  @computed
  get isGhost() {
    return this.profileId === PROFILE_GUEST_ID;
  }
}
