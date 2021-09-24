import { createContext, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "mobx-persist";
import { ProfileStore } from "./profile";
import { NavigationStore } from "./navigation";
import { PostStore } from "./post";
import { AccountStore } from "./account";
import { EmotionStore } from "./emotion";
import { CommentStore } from "./comment";

export class Store {
  accountStore = new AccountStore();
  navigationStore = new NavigationStore();

  postStore: PostStore;
  profileStore: ProfileStore;
  emotionStore: EmotionStore;
  commentStore: CommentStore;

  protected storesHydrated: boolean = false;

  constructor() {
    this.profileStore = new ProfileStore(this);
    this.postStore = new PostStore(this);
    this.emotionStore = new EmotionStore(this);
    this.commentStore = new CommentStore(this);

    this.refreshStores().catch(error => {
      throw error;
    });
  }

  isAccountDataLoaded = () => this.storesHydrated;

  public refreshStores = async () => {
    if (this.storesHydrated) {
      this.profileStore = new ProfileStore(this);
      this.postStore = new PostStore(this);
      this.emotionStore = new EmotionStore(this);
      this.commentStore = new CommentStore(this);
    }

    this.storesHydrated = false;
    this.accountStore = await this.hydrate('account', this.accountStore);
    this.profileStore = await this.hydrate('profiles', this.profileStore);

    const currentProfile = this.profileStore.getCurrentProfile();

    if (currentProfile && currentProfile.isGhost) {
      const { profileId } = currentProfile;
      this.postStore = await this.hydrate(`${profileId}:posts`, this.postStore);
      this.emotionStore = await this.hydrate(`${profileId}:emotions`, this.emotionStore);
      this.commentStore = await this.hydrate(`${profileId}:comments`, this.commentStore);
      this.storesHydrated = true;
    }
  }

  protected hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
    debounce: 100,
  })

  destroyLocalAccountData = () => {
    this.profileStore.profiles.clear();
  }

  deleteAccount = () => this.destroyLocalAccountData();
}

export const appStore = new Store();
const context = createContext(appStore);
export const useStore = () => useContext(context);
