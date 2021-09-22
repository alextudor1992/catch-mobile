import { createContext, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, computed } from "mobx";
import { create } from "mobx-persist";
import { Profile, ProfileStore } from "./profile";
import { NavigationStore } from "./navigation";
import { PostStore } from "./post";
import { AccountStore } from "./account";
import { EmotionStore } from "./emotion";
import { CommentStore } from "./comment";

export class Store {
  accountStore: AccountStore = new AccountStore();
  navigationStore: NavigationStore = new NavigationStore();

  postStore: PostStore;
  profileStore: ProfileStore;
  emotionStore: EmotionStore;
  commentStore: CommentStore;

  storesHydrated: boolean = false;

  constructor() {
    this.profileStore = new ProfileStore(this);
    this.postStore = new PostStore(this);
    this.emotionStore = new EmotionStore(this);
    this.commentStore = new CommentStore(this);

    this.hydrateStores().catch(error => {
      throw error;
    });
  }

  @action
  setActiveProfile = async (profile: Profile) => {
    this.profileStore.activeProfile = profile.profileId;
    await this.hydrateStores();
  }

  @computed
  getActiveProfile = async () => {
    return await this.profileStore.getProfile(this.profileStore.activeProfile) as Profile;
  }

  protected hydrateStores = async () => {
    this.storesHydrated = false;
    this.accountStore = await this.hydrate('account', this.accountStore);
    this.profileStore = await this.hydrate('profiles', this.profileStore);

    const { activeProfile } = this.profileStore;

    this.postStore = await this.hydrate(`${activeProfile}:posts`, this.postStore);
    this.emotionStore = await this.hydrate(`${activeProfile}:emotions`, this.emotionStore);
    this.commentStore = await this.hydrate(`${activeProfile}:comments`, this.commentStore);
    this.storesHydrated = true;
  }

  protected hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
    debounce: 3000,
  })
}

export const appStore = new Store();
const context = createContext(appStore);
export const useStore = () => useContext(context);
