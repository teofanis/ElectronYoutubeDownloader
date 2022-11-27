/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable promise/always-return */
import { DownloadQueue, DownloadQueueItem } from 'interfaces';
import { downloadMP3 } from '../downloader';
import { getState, setState, StoreShape } from '../store';
/* eslint-disable import/prefer-default-export */
import { DownloaderActions } from '../actions/Downloader';

const currentActiveDownloads = (item: DownloadQueueItem) =>
  item.status === 'downloading';

const pushIfNotPresent = (
  item: DownloadQueueItem,
  index: number,
  array: DownloadQueue
): boolean => array.findIndex((i) => i.url === item.url) === index;

const addToDownloadQueue = (payload: DownloadQueueItem): StoreShape => {
  return setState((draft: StoreShape) => {
    return {
      ...draft,
      downloadQueue: [...draft.downloadQueue, payload].filter(pushIfNotPresent),
    };
  });
};

const removeFromDownloadQueue = (payload: DownloadQueueItem): StoreShape => {
  return setState((draft: StoreShape) => {
    return {
      ...draft,
      downloadQueue: [...draft.downloadQueue, payload].filter(
        (item) => item.url !== payload.url
      ),
    };
  });
};

const startDownload = (payload: DownloadQueueItem): StoreShape => {
  const activeDownloads = getState().downloadQueue.filter(
    currentActiveDownloads
  ).length;
  let alteredItem = null;
  const queueLimitIsReached = activeDownloads >= getState().QUEUE_LIMIT;

  const state = setState((draft: StoreShape) => {
    draft.downloadQueue.map((item) => {
      if (item.url === payload.url) {
        item.status = queueLimitIsReached ? 'enqueued' : 'downloading';
        alteredItem = item;
      }
      return item;
    });
  });
  if (!queueLimitIsReached && alteredItem) {
    triggerDownload(payload);
  } else {
    checkAdvanceWorkQueue();
  }
  return state;
};

const triggerDownload = async (item: DownloadQueueItem) => {
  console.log('TRIGGERING');
  downloadMP3(item.url)
    .then((response) => {
      if (response.status === 'success') {
        console.log('SUCCESS');
        updateDownloadItemStatus(item, 'downloaded');
      }
    })
    .catch((error) => {
      console.log(error);
      updateDownloadItemStatus(item, 'error');
    });
};

const checkAdvanceWorkQueue = async () => {
  const { downloadQueue, QUEUE_LIMIT } = getState();
  const activeDownloads = downloadQueue.filter(currentActiveDownloads).length;
  console.log(activeDownloads < QUEUE_LIMIT, activeDownloads, QUEUE_LIMIT);
  if (activeDownloads < QUEUE_LIMIT) {
    const nextItem = downloadQueue.find((item) => item.status === 'enqueued');
    console.log('FOUND NEW QUEUE ITEM', nextItem);
    if (nextItem) {
      updateDownloadItemStatus(nextItem, 'downloading');
      triggerDownload(nextItem);
    }
  }
};
export const updateDownloadItemStatus = (
  item: DownloadQueueItem,
  status: DownloadQueueItem['status']
) => {
  setState((draft: StoreShape) => {
    draft.downloadQueue.map((i) => {
      if (i.url === item.url) {
        i.status = status;
      }
      return i;
    });
    return draft;
  });

  checkAdvanceWorkQueue();
};

const cancelDownload = (payload: DownloadQueueItem): StoreShape => {
  const state = setState((draft: StoreShape) => {
    draft.downloadQueue.map((item) => {
      if (item.url === payload.url) {
        item.status = 'cancelled';
      }
      return item;
    });
    if (draft.downloadProgressMap?.[payload.url]) {
      delete draft.downloadProgressMap[payload.url];
    }
  });
  checkAdvanceWorkQueue();
  return state;
};

const clearDownloadQueue = (): StoreShape => {
  return setState((draft: StoreShape) => {
    draft.downloadQueue = [];
    draft.downloadProgressMap = {};
    return draft;
  });
};

export const updateMetadata = (
  url: string,
  metadata: Partial<DownloadQueueItem['metadata']>
) => {
  setState((draft) => {
    draft.downloadQueue.map((item) => {
      if (item.url === url) {
        item.metadata = metadata;
      }
      return item;
    });
  });
};

export const getDownloadableItem = (url: string) => {
  const state = getState();
  return state.downloadQueue?.find((item) => item.url === url) ?? null;
};

export const updateDownloadProgress = (url: string, progress: number) => {
  setState((draft) => {
    draft.downloadProgressMap[url] = progress;
  });
};

export const DownloaderReducer = {
  [DownloaderActions.START_DOWNLOAD]: startDownload,
  [DownloaderActions.CLEAR_DOWNLOAD_QUEUE]: clearDownloadQueue,
  [DownloaderActions.CANCEL_DOWNLOAD]: cancelDownload,
  [DownloaderActions.ADD_TO_DOWNLOAD_QUEUE]: addToDownloadQueue,
  [DownloaderActions.REMOVE_FROM_DOWNLOAD_QUEUE]: removeFromDownloadQueue,
};
