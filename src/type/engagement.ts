
export enum EmotionType {
  NEUTRAL = 'NEUTRAL',

  LIKE = 'LIKE',
  LOVE = 'LOVE',
  INSPIRED = 'INSPIRED',
  AMUSED = 'AMUSED',
  RELAXED = 'RELAXED',

  DISLIKE = 'DISLIKE',
  DISAPPOINTED = 'DISAPPOINTED',
  SAD = 'SAD',
  UNCOMFORTABLE = 'UNCOMFORTABLE',
  HATE = 'HATE',
}

export type EngagementStats = {
  comments: number;
  emotions: {[key in EmotionType]: number};
}

export const DEFAULT_ENGAGEMENT_STATS = {
  comments: 0,
  emotions: {
    [EmotionType.SAD]: 0,
    [EmotionType.NEUTRAL]: 0,
    [EmotionType.AMUSED]: 0,
    [EmotionType.HATE]: 0,
    [EmotionType.DISLIKE]: 0,
    [EmotionType.DISAPPOINTED]: 0,
    [EmotionType.INSPIRED]: 0,
    [EmotionType.LIKE]: 0,
    [EmotionType.LOVE]: 0,
    [EmotionType.RELAXED]: 0,
    [EmotionType.UNCOMFORTABLE]: 0,
  }
}
