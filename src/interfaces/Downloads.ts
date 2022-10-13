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
};

export type DownloadQueue = DownloadQueueItem[];
