import { makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { EmotionType } from "../../type/engagement";

export class Emotion {
  @observable @persist
  emotion: EmotionType;

  @observable @persist
  dateCreated: Date;

  @observable @persist
  dateUpdated?: Date;

  @observable @persist
  lastSync?: Date;

  constructor(data: Emotion) {
    this.emotion = data.emotion;
    this.dateCreated = data.dateCreated;
    this.lastSync = data.lastSync;
    this.dateUpdated = data.dateUpdated;

    makeObservable(this);
  }
}
