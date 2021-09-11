import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { IdentityStatus } from "../../type/account";
import { PostStore } from "../post";
import { EmotionStore } from "../emotion";
import { CommentStore } from "../comment";
import { ProfileStore } from "../profile";
import { NavigationStore } from "../navigation";

export class Account {
  profileStore?: ProfileStore;
  postStore?: PostStore;
  emotionStore?: EmotionStore;
  commentStore?: CommentStore;
  navigationStore?: NavigationStore;

  @observable @persist
  accountId: string = '';

  @observable @persist
  status: IdentityStatus = IdentityStatus.NOT_VERIFIED;

  @observable @persist('list')
  profiles: string[] = [];

  @observable @persist('map')
  preferences: {[key: string]: any} = {};

  @observable @persist
  currentProfile: string = '';

  constructor(data: Account) {
    this.accountId = data.accountId;
    this.status = data.status;
    this.profiles = data.profiles;
    this.preferences = data.preferences;
    this.currentProfile = data.currentProfile;

    makeObservable(this);
  }
}
