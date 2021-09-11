import { action, observable } from "mobx";
import { persist } from "mobx-persist";
import { Account } from "./account";
import { IdentityStatus } from "../../type/account";
import { hydrate } from "../../store";
import { getProfileStore, Profile } from "../profile";
import { getPostStore } from "../post";
import { getEmotionStore } from "../emotion";
import { getCommentStore } from "../comment";
import { getNavigationStore } from "../navigation";

export class AccountStore {
  @observable @persist('map', Account)
  account = observable.object<Account>({
    accountId: '',
    profiles: [],
    status: IdentityStatus.NOT_VERIFIED,
    preferences: {},
    currentProfile: '',
  });

  @action
  setActiveProfile = async (profile: Profile) => {
    this.account.currentProfile = profile.handle;
    await this.initializeStores();
  }

  @action
  initializeStores = async () => {
    this.account.profileStore = await getProfileStore();
    this.account.navigationStore = await getNavigationStore();

    this.account.postStore = await getPostStore(this.account);
    this.account.emotionStore = await getEmotionStore(this.account);
    this.account.commentStore = await getCommentStore(this.account);
  }
}

export const getAccountStore = async () => await hydrate('account', new AccountStore());

export const accountStore = await hydrate('account', new AccountStore());
