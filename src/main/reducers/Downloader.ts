import { DownloadQueue, DownloadQueueItem } from 'interfaces';
import { StoreShape } from '../store';
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

export const DownloaderReducer = {
  [DownloaderActions.ADD_TO_DOWNLOAD_QUEUE]: addToDownloadQueue,
};
