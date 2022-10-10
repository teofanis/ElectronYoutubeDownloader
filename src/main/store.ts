import { createSharedStore } from 'electron-shared-state';
import { DownloadQueue } from 'interfaces';

const initialState = {
  downloadQueue: [] as DownloadQueue,
  downloadProgressMap: {} as Record<string, number>,
};
const store = createSharedStore(initialState);

export type StoreShape = ReturnType<typeof store.getState>;

export const { getState, setState } = store;
export default store;
