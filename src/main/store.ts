import { createSharedStore } from 'electron-shared-state';
import { DownloadQueue } from 'interfaces';

const initialState = {
  downloadQueue: [] as DownloadQueue,
};
const store = createSharedStore(initialState);

export type StoreShape = ReturnType<typeof store.getState>;

export const { setState } = store;
export default store;
