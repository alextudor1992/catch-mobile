
export enum PostStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
}

export type PostSettings = {
  commentsAllowed: boolean;
}

export const DEFAULT_POST_SETTINGS: PostSettings = {
  commentsAllowed: true,
}
