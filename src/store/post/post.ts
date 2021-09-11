import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { Profile } from "../profile";
import { PostStatus } from "../../type/post";

export class Post {
  @observable @persist
  postId: string;

  @observable @persist('object', Profile)
  author: Profile;

  @observable @persist
  mediaUrl: string;

  @observable @persist
  description?: string;

  @observable @persist('map')
  links: {
    tags: string[],
    mentions: Profile[],
    places: string[],
    urls: string[],
  };

  @observable @persist
  status: PostStatus;

  @observable @persist
  dateCreated: Date;

  @observable @persist
  dateUpdated?: Date;

  @observable @persist
  lastSync?: Date;

  constructor(data: Post) {
    this.postId = data.postId;
    this.author = data.author;
    this.mediaUrl = data.mediaUrl;
    this.links = data.links;
    this.description = data.description;
    this.dateCreated = data.dateCreated;
    this.status = data.status;
    this.dateUpdated = data.dateUpdated;
    this.lastSync = data.lastSync;

    makeObservable(this);
  }
}
