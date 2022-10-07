import { DownloadQueueItem } from 'interfaces';
import { StoreShape } from '../store';
/* eslint-disable import/prefer-default-export */
import { DownloaderActions } from '../actions/Downloader';

export const DownloaderReducer = {
  [DownloaderActions.ADD_TO_DOWNLOAD_QUEUE]: (
    state: StoreShape,
    payload: DownloadQueueItem
  ) => {
    return {
      ...state,
      downloadQueue: [...state.downloadQueue, payload],
    };
  },
};

type DownloaderReducerType = {
  [key in keyof typeof DownloaderActions]: (
    state: StoreShape,
    payload: any
  ) => StoreShape;
};
