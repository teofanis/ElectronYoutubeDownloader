export type DownloadStatus =
  | 'idle'
  | 'downloading'
  | 'cancelled'
  | 'downloaded'
  | 'error';
export type DownloadQueueItem = {
  url: string;
  status: DownloadStatus;
};

export type DownloadQueue = DownloadQueueItem[];
