
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
