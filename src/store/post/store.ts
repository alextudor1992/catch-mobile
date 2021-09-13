import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { Post } from "./post";
import { Store } from "../../store";

export class PostStore {

  constructor(protected store: Store) {}

  @observable @persist('list', Post)
  posts = observable.array<Post>([]);

  @action
  setPost = (post: Post) => {
    this.posts.push(post);
  }

  @action
  removePost = (post: Post) => {
    this.posts.splice(this.posts.findIndex(({postId}) => post.postId === postId), 1);
  }

  @action
  updatePost = (post: Post) => {
    post.dateUpdated = new Date();
  }

  @computed
  getPost = (postId: string) => {
    return this.posts[this.posts.findIndex((post) => post.postId === postId)];
  };
}

export function* posts(store: PostStore, count: number, offset: number) {
  for (let i=offset; i<count; i++) {
    yield store.posts[i];
  }
}
