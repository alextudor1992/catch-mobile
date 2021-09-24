
export type Score = {
  globalScore: number;
  personalScore: number;
}

export const DEFAULT_SCORE: Score = {
  globalScore: 0,
  personalScore: 0,
}

export const INITIAL_SCORE_UNVERIFIED_ACCOUNT = -5;
