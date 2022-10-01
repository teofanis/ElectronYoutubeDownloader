import { DownloadQueue, DownloadQueueItem } from 'interfaces';
import create from 'zustand';

interface DownloaderStore {
  downloadQueue: DownloadQueue;
  cancelationCallbacks: (() => void)[];
  clearCancelationCallbacks: () => void;
  addCancelationCallback: (callback: () => void) => void;
  addToDownloadQueue: (link: string) => void;
  removeFromDownloadQueue: (link: string) => void;
}

const pushIfNotPresent = (
  item: DownloadQueueItem,
  index: number,
  array: DownloadQueue
): boolean => array.findIndex((i) => i.url === item.url) === index;

const useDownloaderStore = create<DownloaderStore>()((set) => ({
  downloadQueue: [],
  cancelationCallbacks: [],
  addCancelationCallback: (callback: () => void) => {
    set((state) => ({
      cancelationCallbacks: [...state.cancelationCallbacks, callback],
    }));
  },
  clearCancelationCallbacks: () => {
    set((state) => ({
      cancelationCallbacks: [],
    }));
  },
  addToDownloadQueue: (url: string) =>
    set((state) => ({
      downloadQueue: [...state.downloadQueue, { url }].filter(pushIfNotPresent),
    })),
  removeFromDownloadQueue: (url: string) =>
    set((state) => ({
      downloadQueue: [...state.downloadQueue, { url }].filter(
        (item) => item.url !== url
      ),
    })),
}));

export default useDownloaderStore;
