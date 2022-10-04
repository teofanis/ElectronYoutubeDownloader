import { Channels } from 'main/preload';
import { useEffect, useState } from 'react';
import { CONSTANTS } from 'utils/constants';
import getLinkChannelName from 'utils/getLinkChannelName';
import { MoreVideoDetails } from 'ytdl-core';
import useDownloaderStore from './useDownloaderStore';

const { ipcRenderer } = window.electron;

const useDownload = (youtubeLink: string) => {
  const addCancelationCallback = useDownloaderStore(
    (state) => state.addCancelationCallback
  );

  const removeCancelationCallback = useDownloaderStore(
    (state) => state.removeCancelationCallback
  );
  const updateItemStatus = useDownloaderStore(
    (state) => state.updateItemStatus
  );
  const getDownloadQueueItem = useDownloaderStore(
    (state) => state.getDownloadQueueItem
  );
  const [link] = useState(youtubeLink);
  const [currentSongTitle, setCurrentSongTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<MoreVideoDetails>();
  const downloadableItem = getDownloadQueueItem(link);

  const progressHandler = (downloadProgressNumber: any) => {
    setProgress(downloadProgressNumber);
    if (downloadableItem?.status !== 'downloading') {
      updateItemStatus(link, 'downloading');
    }
  };

  const stopAndReset = () => {
    setProgress(0);
    setVideoMetadata(undefined);
  };

  const downloadResponseHandler = (response: any) => {
    if (response.status === 'error') {
      updateItemStatus(link, 'error');
      removeCancelationCallback(link);
    }
    if (response.status === 'success') {
      updateItemStatus(link, 'downloaded');
      removeCancelationCallback(link);
    }
    if (response.status === 'cancelled') {
      updateItemStatus(link, 'cancelled');
      removeCancelationCallback(link);
    }
    stopAndReset();
  };

  const currentDownloadHandler = (data: any) => {
    const { title, videoDetails } = data;
    setCurrentSongTitle(title);
    setVideoMetadata(videoDetails);
  };

  useEffect(() => {
    const LISTENERS = [
      {
        channel: getLinkChannelName(link, CONSTANTS.DOWNLOAD),
        handler: downloadResponseHandler,
      },
      {
        channel: getLinkChannelName(link, CONSTANTS.PROGRESS_UPDATE),
        handler: progressHandler,
      },
      {
        channel: getLinkChannelName(link, CONSTANTS.CURRENT_DOWNLOAD_META_DATA),
        handler: currentDownloadHandler,
      },
    ];

    LISTENERS.forEach(({ channel, handler }) =>
      ipcRenderer.on(channel, handler)
    );
    return () =>
      LISTENERS.forEach(({ channel }) =>
        ipcRenderer.removeAllListeners(channel)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancel = () => {
    const event = getLinkChannelName(
      link,
      CONSTANTS.CANCEL_DOWNLOAD
    ) as Channels;
    ipcRenderer.sendMessage(event, []);
    updateItemStatus(link, 'cancelled');
    stopAndReset();
  };

  const download = (url: string) => {
    if (downloadableItem?.status === 'downloaded') return;
    ipcRenderer.sendMessage(CONSTANTS.DOWNLOAD, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      url,
    });
    addCancelationCallback(link, cancel);
  };

  return {
    downloadableItem,
    download,
    progress,
    currentSongTitle,
    cancel,
    videoMetadata,
  };
};

export default useDownload;
