import { computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { ContentSegment } from "../../type/common";

export const PROFILE_GUEST_ID = 'guest-profile-id';

export class Profile {
  @observable @persist
  profileId: string = PROFILE_GUEST_ID;

  @observable @persist
  handle: string = 'guest';

  @observable @persist
  name?: string;

  @observable @persist('list')
  readonly bio = observable.array<ContentSegment>([]);

  @observable @persist
  picture?: string = '';

  @observable @persist
  enabled: boolean = true;

  @observable @persist
  dateCreated?: string;

  constructor() {
    makeObservable(this);
  }

  @computed
  get isGuest() {
    return this.profileId === PROFILE_GUEST_ID;
  }
}
