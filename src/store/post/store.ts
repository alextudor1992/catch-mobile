import { action, computed, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { Post } from "./post";
import { Store } from "../../store";
import { formatDate } from "../../utils/date";
import { StoreInterface } from "../common";

export class PostStore implements StoreInterface {
  @observable @persist('list', Post)
  readonly posts = observable.array<Post>([]);

  constructor(protected store: Store) {
    makeObservable(this);
  }

  readonly createPost = () => {
    const post = new Post();
    post.authorId = this.store.profileStore.activeProfile;
    return post;
  }

  @action
  publishPost = (post: Post) => {
    if (this.canPublish(post)) {
      post.dateCreated = formatDate();
      this.posts.push(post);
    }
  };

  @action
  removePost = (post : Post) => {
    this.posts.remove(post);
    this.destroyReferences(post.postId);
  };

  @action
  updatePost = (post: Post) => {
    if (this.canPublish(post)) {
      post.dateUpdated = formatDate();
    }
  };

  canPublish = (post: Post) => !!post.description.length;

  @computed
  readonly getPost = (postId: string) => this.posts.find((post) => post.postId === postId);

  readonly getPostsIterator = (authorId: string) => {
    const posts = this.posts;
    return (function* () {
      for (let post of posts) {
        if (post.authorId === authorId) {
          yield post;
        }
      }
    })();
  }

  @action
  destroyReferences = (postId) => {
    this.posts.remove(this.getPost(postId) as Post);
    this.store.commentStore.destroyReferences(postId);
    this.store.emotionStore.destroyReferences(postId);
  }

  clearStore = () => {
    this.posts.clear();
  }
}
