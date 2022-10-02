import { DownloadQueue, DownloadQueueItem, DownloadStatus } from 'interfaces';
import create from 'zustand';

interface DownloaderStore {
  downloadQueue: DownloadQueue;
  cancelationCallbacks: (() => void)[];
  clearCancelationCallbacks: () => void;
  addCancelationCallback: (callback: () => void) => void;
  addToDownloadQueue: (link: string) => void;
  removeFromDownloadQueue: (link: string) => void;
  updateItemStatus: (link: string, status: DownloadStatus) => void;
  getDownloadQueueItem: (link: string) => DownloadQueueItem | undefined;
  clearDownloadQueue: () => void;
}

const pushIfNotPresent = (
  item: DownloadQueueItem,
  index: number,
  array: DownloadQueue
): boolean => array.findIndex((i) => i.url === item.url) === index;

const useDownloaderStore = create<DownloaderStore>()((set, get) => ({
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
      downloadQueue: [
        ...state.downloadQueue,
        { url, status: 'idle' } as DownloadQueueItem,
      ].filter(pushIfNotPresent),
    })),
  removeFromDownloadQueue: (url: string) =>
    set((state) => ({
      downloadQueue: state.downloadQueue.filter((item) => item.url !== url),
    })),
  updateItemStatus: (url: string, status: DownloadStatus) =>
    set((state) => ({
      downloadQueue: state.downloadQueue.map((item) =>
        item.url === url ? { ...item, status } : item
      ),
    })),
  getDownloadQueueItem: (link: string) => {
    return get().downloadQueue.find((item) => item.url === link);
  },
  clearDownloadQueue: () => {
    set((state) => ({
      downloadQueue: [],
    }));
  },
}));

export default useDownloaderStore;
