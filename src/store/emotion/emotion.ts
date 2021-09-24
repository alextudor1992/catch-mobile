import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { EmotionType } from "./types";
import { ContentEntity, DEFAULT_CONTENT_ENTITY, DEFAULT_TIMESTAMPS_INFO, TimestampsInfo } from "../common";

export class Emotion {
  @observable @persist
  emotionId: string = '';

  @observable @persist('object')
  readonly entity = observable.object<ContentEntity>(DEFAULT_CONTENT_ENTITY);

  @observable @persist
  emotion: EmotionType = EmotionType.NEUTRAL;

  @observable @persist('object')
  readonly timestamps = observable.object<TimestampsInfo>(DEFAULT_TIMESTAMPS_INFO);

  @observable @persist
  lastSync?: string;

  constructor() {
    makeObservable(this);
  }
}
