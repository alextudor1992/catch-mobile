import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { EmotionType } from "../../type/engagement";
import { ContentEntity, DEFAULT_CONTENT_ENTITY, EntityType } from "../../type/entity";

export class Emotion {
  @observable @persist
  emotionId: string = '';

  @observable @persist('object')
  readonly entity = observable.object<ContentEntity>(DEFAULT_CONTENT_ENTITY);

  @observable @persist
  emotion: EmotionType = EmotionType.NEUTRAL;

  @observable @persist
  dateCreated?: string;

  @observable @persist
  dateUpdated?: string;

  @observable @persist
  lastSync?: string;

  constructor() {
    makeObservable(this);
  }
}
