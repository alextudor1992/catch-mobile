import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";

export class Profile {
  @observable @persist
  handle: string;

  @observable @persist
  name?: string;

  @observable @persist
  bio?: string;

  @observable @persist
  picture?: string;

  @observable @persist
  dateCreated?: Date;

  constructor(data: Profile) {
    this.bio = data.bio;
    this.name = data.name;
    this.handle = data.handle;
    this.picture = data.picture;
    this.dateCreated = data.dateCreated;

    makeObservable(this);
  }
}
