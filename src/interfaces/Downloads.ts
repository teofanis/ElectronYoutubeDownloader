import { MoreVideoDetails } from 'ytdl-core';

export type DownloadStatus =
  | 'idle' // added not acted upon
  | 'enqueued' // has been enqueued and will be proceeded in order
  | 'downloading' // is currently downloading
  | 'cancelled' // has been cancelled
  | 'downloaded' // has been downloaded
  | 'converting' // is currently converting
  | 'error'; // has encountered an error
export type DownloadQueueItem = {
  url: string;
  status: DownloadStatus;
  metadata?: Partial<MoreVideoDetails>;
};

export type DownloadQueue = DownloadQueueItem[];
