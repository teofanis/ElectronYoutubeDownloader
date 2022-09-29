import { DownloadQueue } from '../interfaces';
import createStore from './createStore';

const store = createStore({
  downloadHasStarted: false,
  downloadQueue: [] as DownloadQueue,
});

export type MainStore = ReturnType<typeof store.getState>;

export default store;
