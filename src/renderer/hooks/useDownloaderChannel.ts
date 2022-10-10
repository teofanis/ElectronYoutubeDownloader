import { DownloadQueue } from 'interfaces';
import { DownloaderActions } from 'main/actions/Downloader';
import { useCallback } from 'react';
import { useIpc } from 'renderer/context/AppContext';
import useStore from './useStore';

const useDownloaderChannel = () => {
  const channel = 'downloader-channel';
  const { send } = useIpc(channel);

  const downloadQueue = useStore(
    useCallback((state) => state.downloadQueue, [])
  ) as DownloadQueue;

  const progressMap = useStore(
    useCallback((state) => state.downloadProgressMap, [])
  ) as Record<string, number>;

  const addToDownloadQueue = async (url: string) => {
    send(DownloaderActions.ADD_TO_DOWNLOAD_QUEUE, {
      url,
      status: 'idle',
    });
  };

  const removeFromDownloadQueue = async (url: string) => {
    send(DownloaderActions.REMOVE_FROM_DOWNLOAD_QUEUE, { url });
  };

  const clearDownloadQueue = () =>
    send(DownloaderActions.CLEAR_DOWNLOAD_QUEUE, {});

  const cancelDownload = async (url: string) => {
    send(DownloaderActions.CANCEL_DOWNLOAD, { url });
  };
  const getProgress = (url: string) => {
    return progressMap?.[url] ?? 0;
  };

  const getDownloadableItem = (url: string) => {
    return downloadQueue?.find((item) => item.url === url) ?? null;
  };
  const startAllDownloads = () => {
    downloadQueue?.forEach((item) =>
      send(DownloaderActions.START_DOWNLOAD, item)
    );
  };
  const stopAllDownloads = () => {
    const cancellableStatuses = ['downloading', 'idle'];
    downloadQueue.forEach(({ url, status }) => {
      if (cancellableStatuses.includes(status)) {
        cancelDownload(url);
      }
    });
  };

  const startDownload = (url: string) => {
    const item = getDownloadableItem(url);
    if (item) {
      send(DownloaderActions.START_DOWNLOAD, item);
    }
  };

  const selectFromFile = async () => {
    return send(DownloaderActions.DOWNLOAD_FROM_TEXT_FILE, {});
  };
  return {
    startDownload,
    selectFromFile,
    startAllDownloads,
    cancelDownload,
    stopAllDownloads,
    addToDownloadQueue,
    removeFromDownloadQueue,
    clearDownloadQueue,
    downloadQueue,
    getProgress,
    getDownloadableItem,
  };
};

export default useDownloaderChannel;
