import { DownloadQueue, DownloadQueueItem } from 'interfaces';
import { getState, setState, StoreShape } from '../store';
/* eslint-disable import/prefer-default-export */
import { DownloaderActions } from '../actions/Downloader';

const pushIfNotPresent = (
  item: DownloadQueueItem,
  index: number,
  array: DownloadQueue
): boolean => array.findIndex((i) => i.url === item.url) === index;

const addToDownloadQueue = (
  state: StoreShape,
  payload: DownloadQueueItem
): StoreShape => {
  return {
    ...state,
    downloadQueue: [...state.downloadQueue, payload].filter(pushIfNotPresent),
  };
};

const removeFromDownloadQueue = (
  state: StoreShape,
  payload: DownloadQueueItem
): StoreShape => {
  return {
    ...state,
    downloadQueue: [...state.downloadQueue, payload].filter(
      (item) => item.url !== payload.url
    ),
  };
};

const startDownload = (
  state: StoreShape,
  payload: DownloadQueueItem
): StoreShape => {
  // Electron-store uses IMMER under the hood and state here is taking care of the immutability
  state.downloadQueue.map((item) => {
    if (item.url === payload.url) {
      item.status = 'downloading';
    }
    return item;
  });
  return state;
};

const cancelDownload = (
  state: StoreShape,
  payload: DownloadQueueItem
): StoreShape => {
  state.downloadQueue.map((item) => {
    if (item.url === payload.url) {
      item.status = 'cancelled';
    }
    return item;
  });

  if (state.downloadProgressMap?.[payload.url]) {
    delete state.downloadProgressMap[payload.url];
  }

  return state;
};

const clearDownloadQueue = (state: StoreShape): StoreShape => {
  return {
    ...state,
    downloadQueue: [],
    downloadProgressMap: {},
  };
};

export const updateMetadata = (
  url: string,
  metadata: DownloadQueueItem['metadata']
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
