
export enum ContentSegmentType {
  TEXT = 'text',
  TAG = 'tag',
  PROFILE = 'profile',
  PLACE = 'place',
  URL = 'url',
  POST = 'post'
}

export type ContentSegment = {
  type: ContentSegmentType,
  value: string;
}
