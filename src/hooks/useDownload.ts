import { Channels } from 'main/preload';
import { useEffect, useState } from 'react';
import { CONSTANTS } from 'utils/constants';
import getLinkChannelName from 'utils/getLinkChannelName';
import { MoreVideoDetails } from 'ytdl-core';

const { ipcRenderer } = window.electron;

const useDownload = (youtubeLink: string) => {
  const [link, setLink] = useState(youtubeLink);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<MoreVideoDetails>();
  const progressHandler = (downloadProgressNumber: any) => {
    if (!isDownloading) {
      setIsDownloading(true);
    }
    setProgress(downloadProgressNumber);
  };

  const stopAndReset = () => {
    setIsPaused(false);
    setIsDownloading(false);
    setProgress(0);
    setCurrentSongTitle('');
    setVideoMetadata(undefined);
  };
  const downloadResponseHandler = (event: any, data: any) => {
    console.log(event, data);
    console.log('Download response handler');
    stopAndReset();
  };

  const pauseHandler = () => {
    setIsPaused((prev) => !prev);
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
      {
        channel: getLinkChannelName(link, CONSTANTS.PAUSE_DOWNLOAD),
        handler: pauseHandler,
      },
    ];

    LISTENERS.forEach(({ channel, handler }) => {
      console.log('Adding listener', channel);
      ipcRenderer.on(channel, handler);
    });
    return () =>
      LISTENERS.forEach(({ channel }) =>
        ipcRenderer.removeAllListeners(channel)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pause = () => {
    const event = getLinkChannelName(
      link,
      CONSTANTS.PAUSE_DOWNLOAD
    ) as Channels;
    ipcRenderer.sendMessage(event, []);
  };
  const cancel = () => {
    const event = getLinkChannelName(
      link,
      CONSTANTS.CANCEL_DOWNLOAD
    ) as Channels;
    ipcRenderer.sendMessage(event, []);
    stopAndReset();
  };

  const downloadFromFile = () => {
    const event = getLinkChannelName(link, CONSTANTS.DOWNLOAD_FILE) as Channels;
    ipcRenderer.sendMessage(event, []);
  };

  const download = (url: string) => {
    setIsDownloading(true);
    ipcRenderer.sendMessage(CONSTANTS.DOWNLOAD, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      url,
    });
  };

  return {
    isPaused,
    isDownloading,
    download,
    progress,
    currentSongTitle,
    pause,
    cancel,
    downloadFromFile,
    videoMetadata,
  };
};

export default useDownload;
