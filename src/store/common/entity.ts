
export enum EntityType {
  UNKNOWN,
  PROFILE = 'profile',
  POST = 'post',
  COMMENT = 'comment',
}

export type ContentEntity = {
  type: EntityType;
  id: string;
}

export const DEFAULT_CONTENT_ENTITY: ContentEntity = {
  type: EntityType.UNKNOWN,
  id: '',
}
