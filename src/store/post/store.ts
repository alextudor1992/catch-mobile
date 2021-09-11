import { action, observable } from "mobx";
import { persist } from "mobx-persist";
import { Post } from "./post";
import { hydrate } from "../../store";
import { Account } from "../account";

export class PostStore {

  constructor(protected account: Account) {}

  @observable @persist('map', Post)
  posts = observable.map<string, Post>({});

  @action
  setPost = (post: Post) => {
    this.posts.set(post.postId, post);
  }

  @action
  removePost = (post: Post) => {
    if (this.posts.has(post.postId)) {
      this.posts.delete(post.postId);
    }
  }

  @action
  updatePost = (post: Post) => {
    post.dateUpdated = new Date();
  }

  getPost = (postId: string) => {
    return this.posts.get(postId);
  }
}

export const getPostStore = async (account: Account) => await hydrate(`${account.currentProfile}_posts`, new PostStore(account));
