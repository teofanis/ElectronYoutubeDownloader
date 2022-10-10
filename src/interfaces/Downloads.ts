import { MoreVideoDetails } from 'ytdl-core';

export type DownloadStatus =
  | 'idle'
  | 'downloading'
  | 'cancelled'
  | 'downloaded'
  | 'error';
export type DownloadQueueItem = {
  url: string;
  status: DownloadStatus;
  metadata?: MoreVideoDetails;
  cancel?: () => void;
};

export type DownloadQueue = DownloadQueueItem[];

export type CancelableItem = {
  link: string;
  cancel: () => void;
};
