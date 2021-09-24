import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { v4 as uuid } from 'uuid';
import { Emotion } from "./emotion";
import { EmotionType } from "./types";
import { Post } from "../post";
import { Store } from "../store";
import { EntityType } from "../common";
import { Comment } from "../comment";
import { formatDate } from "../../utils/date";
import { Profile } from "../profile";
import { StoreInterface } from "../common";

export class EmotionStore implements StoreInterface {
  @observable @persist('map', Emotion)
  readonly emotions = observable.map<string, Emotion>({});

  constructor(protected store: Store) {}

  @action
  createEmotion = (entity: Post | Comment | Profile, emotion: EmotionType) => {
    if (this.store.profileStore.belongsToCurrentAccount(this.getEntityId(entity))) {
      throw new Error('A profile cannot react to their own content');
    }

    const contentEmotion = new Emotion();
    contentEmotion.emotionId = uuid();
    contentEmotion.emotion = emotion;

    if (this.emotions.has(this.getEntityId(entity))) {
      contentEmotion.timestamps.updated = formatDate();
    }
    else contentEmotion.timestamps.created = formatDate();

    if (entity instanceof Post) {
      contentEmotion.entity.id = entity.postId;
      contentEmotion.entity.type = EntityType.POST;
    }
    else if (entity instanceof Comment) {
      contentEmotion.entity.id = entity.commentId;
      contentEmotion.entity.type = EntityType.COMMENT;
    }
    else if (entity instanceof Profile) {
      contentEmotion.entity.id = entity.profileId;
      contentEmotion.entity.type = EntityType.PROFILE;
    }
    this.emotions.set(contentEmotion.entity.id, contentEmotion);

    if (!this.store.profileStore.getCurrentProfile()?.isGhost) {
      // TODO: API Call to push the reaction to the backend, only if the profile is non-ghost.
    }
  }

  @action
  removeEmotion = entityId => this.emotions.delete(entityId);

  @computed
  getEmotion = entityId => this.emotions.get(entityId);

  @action
  destroyReferences = (entityId: string) => this.emotions.delete(entityId);

  protected getEntityId = (entity: Post | Comment | Profile) => {
    if (entity instanceof Post) {
      return entity.postId;
    }
    else if (entity instanceof Comment) {
      return entity.commentId;
    }
    else if (entity instanceof Profile) {
      return entity.profileId;
    }
    throw new Error('Entity is not an instance of Post or Comment');
  }

  clearStore = () => {
    this.emotions.clear();
  }
}
