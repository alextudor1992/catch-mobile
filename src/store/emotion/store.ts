import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { Emotion } from "./emotion";
import { EmotionType } from "../../type/engagement";
import { Post } from "../post";
import { Store } from "../store";

export class EmotionStore {

  constructor(protected store: Store) {}

  @observable @persist('map', Emotion)
  emotions = observable.map<string, Emotion>({});

  @action
  createEmotion = (post: Post, emotion: EmotionType) => {
    this.emotions.set(post.postId, {
      emotion,
      dateCreated: new Date(),
    });
  }

  @action
  removeEmotion = (post: Post) => {
    this.emotions.delete(post.postId);
  }

  @computed
  getEmotion = (post: Post) => {
    return this.emotions.get(post.postId);
  }
}
