import { action, computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { Profile, PROFILE_GUEST_ID } from "./profile";
import { Store } from "../store";
import { StoreInterface } from "../common/types";

export class ProfileStore implements StoreInterface {
  @observable @persist('map', Profile)
  readonly profiles = observable.map<string, Profile>({
    [PROFILE_GUEST_ID]: new Profile(),
  });

  @observable @persist
  activeProfile: string = PROFILE_GUEST_ID;

  constructor(protected store: Store) {
    makeObservable(this);
  }

  @action
  createProfile = async (profile: Profile) => {
    if (this.getProfileByHandle(profile.handle) !== undefined) {
      throw new Error('Another profile uses the same handle');
    }
    if (this.profiles.has(profile.profileId)) {
      this.profiles.set(profile.profileId, profile);
    }
  }

  @action
  removeProfile = ({profileId}: Profile) => {
    if (this.store.accountStore.profiles.includes(profileId) && this.profiles.delete(profileId)) {
      this.store.postStore.posts.forEach(post => {
        if (post.authorId === profileId) {
          this.store.postStore.destroyReferences(post.postId);
        }
      });
    }
  }

  @action
  switchProfile = async ({profileId}: Profile) => {
    this.activeProfile = profileId;
    return await this.store.refreshStores();
  }

  @computed
  getProfile = (profileId: string) => this.profiles.get(profileId);

  @computed
  getCurrentProfile = () => {
    return this.getProfile(this.activeProfile);
  }

  @computed
  belongsToCurrentAccount = (profileId: string) => {
    return this.store.accountStore.profiles.includes(profileId);
  }

  protected getProfileByHandle = (handle: string) => {
    const profileId = this.store.accountStore.profiles.find(
      profileId => this.profiles.get(profileId)?.handle === handle
    );

    return profileId ? this.profiles.get(profileId) : undefined;
  }

  @action
  clearStore = () => {
    this.profiles.clear();
    this.profiles.set(PROFILE_GUEST_ID, new Profile());
  }
}
