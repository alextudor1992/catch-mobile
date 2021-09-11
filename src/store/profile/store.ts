import { action, observable } from "mobx";
import { persist } from "mobx-persist";
import { Profile } from "./profile";
import { hydrate } from "../../store";

export class ProfileStore {
  @observable @persist('map', Profile)
  profiles = observable.map<string, Profile>({});

  @action
  createProfile = (profile: Profile) => {
    if (!this.profiles.has(profile.handle)) {
      this.profiles.set(profile.handle, profile);
    }
  }

  @action
  removeProfile = (profile: Profile) => {
    if (this.profiles.has(profile.handle)) {
      this.profiles.delete(profile.handle);
    }
  }
}

export const getProfileStore = async () => await hydrate('profiles', new ProfileStore());
