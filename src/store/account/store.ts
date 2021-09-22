import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { AccountType, IdentityStatus } from "../../type/account";

export class AccountStore {
  @observable @persist
  accountId: string = '';

  @observable @persist
  status: IdentityStatus = IdentityStatus.NOT_VERIFIED;

  @observable @persist
  type: AccountType = AccountType.PERSONAL;

  @observable @persist('list')
  readonly profiles: string[] = observable.array([]);

  @observable @persist('map')
  readonly preferences: {[key: string]: any} = observable.map({});

  constructor() {
    makeObservable(this);
  }
}
