import { Post } from "../post";
import { Comment } from "../comment";
import { Profile } from "../profile";

export interface StoreInterface {
  clearStore?: () => void;
  destroyReferences?: ((entityId: string) => unknown) | ((entity: Post | Comment | Profile) => unknown);
}

export enum ContentSegmentType {
  TEXT = 'text',
  TAG = 'tag',
  PROFILE = 'profile',
  PLACE = 'place',
  URL = 'url',
}

export type ContentSegment = {
  type: ContentSegmentType,
  value: string;
}

export type Score = {
  globalScore: number;
  personalScore: number;
}

export const DEFAULT_SCORE: Score = {
  globalScore: 0,
  personalScore: 0,
}

export const INITIAL_SCORE_UNVERIFIED_ACCOUNT = -5;

export type SyncInfo = {
  lastPush: string;
  lastPull: string;
  waitingToUpdate: boolean;
  shouldBeEvicted: boolean;
}

export const DEFAULT_SYNC_INFO: SyncInfo = {
  lastPush: '',
  lastPull: '',
  waitingToUpdate: false,
  shouldBeEvicted: false,
}

export type MediaInfo = {
  altText?: string;
  mediaSizes: {
    xs: string;
    md: string;
    lg: string;
  }
}

export const DEFAULT_MEDIA_INFO: MediaInfo = {
  mediaSizes: {
    xs: '',
    md: '',
    lg: '',
  }
}

export type TimestampsInfo = {
  created: string;
  updated: string;
}

export const DEFAULT_TIMESTAMPS_INFO: TimestampsInfo = {
  created: '',
  updated: '',
}
