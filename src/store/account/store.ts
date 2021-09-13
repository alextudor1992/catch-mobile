import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { IdentityStatus } from "../../type/account";

export class AccountStore {
  @observable @persist
  accountId: string = '';

  @observable @persist
  status: IdentityStatus = IdentityStatus.NOT_VERIFIED;

  @observable @persist('list')
  profiles: string[] = observable.array([]);

  @observable @persist('map')
  preferences: {[key: string]: any} = observable.map({});

  @observable @persist
  activeProfile: string = '';

  constructor() {
    makeObservable(this);
  }
}
