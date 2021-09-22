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
