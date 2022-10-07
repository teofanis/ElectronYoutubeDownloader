import { createSharedStore } from 'electron-shared-state';

const initialState = {
  downloadQueue: [],
};
const store = createSharedStore<{ downloadQueue: string[] }>(initialState);

export type StoreShape = ReturnType<typeof store.getState>;

export default store;
