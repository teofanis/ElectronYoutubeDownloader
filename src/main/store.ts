import { DownloadQueue } from 'interfaces';
import { createSharedStore } from '../libs/electron-shared-state';

const initialState = {
  downloadQueue: [] as DownloadQueue,
  downloadProgressMap: {} as Record<string, number>,
  QUEUE_LIMIT: 3,
};
const store = createSharedStore(initialState);

export type StoreShape = ReturnType<typeof store.getState>;

export const { getState, setState } = store;
export default store;
