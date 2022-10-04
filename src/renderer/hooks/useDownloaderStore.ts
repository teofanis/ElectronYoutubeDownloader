import {
  CancelableItem,
  DownloadQueue,
  DownloadQueueItem,
  DownloadStatus,
} from 'interfaces';
import create from 'zustand';

interface DownloaderStore {
  downloadQueue: DownloadQueue;
  cancelationCallbacks: CancelableItem[];
  clearCancelationCallbacks: () => void;
  addCancelationCallback: (link: string, callback: () => void) => void;
  removeCancelationCallback: (link: string) => void;
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
  addCancelationCallback: (link: string, callback: () => void) => {
    const cancelableItem = {
      link,
      cancel: callback,
    };
    set((state) => ({
      cancelationCallbacks: [...state.cancelationCallbacks, cancelableItem],
    }));
  },
  removeCancelationCallback: (link: string) => {
    set((state) => ({
      cancelationCallbacks: [...state.cancelationCallbacks].filter(
        (item) => item.link !== link
      ),
    }));
  },
  clearCancelationCallbacks: () => {
    set((_state) => ({
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
    set((_state) => ({
      downloadQueue: [],
    }));
  },
}));

export default useDownloaderStore;
