import { action, computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { AccountType, IdentityStatus } from "./types";
import { StoreInterface } from "../common";

export class AccountStore implements StoreInterface {
  @observable @persist
  accountId: string = '';

  @observable @persist
  status: IdentityStatus = IdentityStatus.NOT_VERIFIED;

  @observable @persist
  type: AccountType = AccountType.PERSONAL;

  @observable @persist
  phoneNumber: string = '';

  @observable @persist
  email: string = '';

  @observable @persist('list')
  readonly profiles = observable.array<string>([]);

  @observable @persist('map')
  readonly preferences = observable.map({});

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
  readonly clearStore = () => {
    this.accountId = '';
    this.email = '';
    this.phoneNumber = '';
    this.status = IdentityStatus.NOT_VERIFIED;
    this.type = AccountType.PERSONAL;
    this.profiles.clear();
    this.preferences.clear();
  }
}
