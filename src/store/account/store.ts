import { action, computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { AccountType, IdentityStatus } from "./types";
import { StoreInterface } from "../common/types";

export class AccountStore implements StoreInterface {
  @observable @persist
  accountId: string = '';

  @observable @persist
  status: IdentityStatus = IdentityStatus.NOT_VERIFIED;

  @observable @persist
  type: AccountType = AccountType.PERSONAL;

  @observable @persist('list')
  readonly profiles = observable.array<string>([]);

  @observable @persist('map')
  readonly preferences = observable.map<{[key: string]: any}>({});

  constructor() {
    makeObservable(this);
  }

  @computed
  get isAuthenticated() {
    return !!this.accountId;
  }

  @computed
  get isVerified() {
    return this.status === IdentityStatus.VERIFIED;
  }

  @action
  clearStore = () => {
    this.accountId = '';
    this.status = IdentityStatus.NOT_VERIFIED;
    this.type = AccountType.PERSONAL;
    this.profiles.clear();
    this.preferences.clear();
  }
}
