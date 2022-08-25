import { useEffect, useState } from 'react';
import { CONSTANTS } from 'utils/constants';
import { MoreVideoDetails } from 'ytdl-core';

const { ipcRenderer } = window.electron;

const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<MoreVideoDetails>();

  const progressHandler = (downloadProgressNumber: any) =>
    setProgress(downloadProgressNumber);

  const stopAndReset = () => {
    setIsDownloading(false);
    setProgress(0);
    setCurrentSongTitle('');
    setVideoMetadata(undefined);
  };
  const downloadResponseHandler = (event: any, data) => {
    console.log('Download response handler');
    stopAndReset();
  };

  const currentDownloadHandler = (data: any) => {
    const { title, videoDetails } = data;
    setCurrentSongTitle(title);
    setVideoMetadata(videoDetails);
  };
  useEffect(() => {
    ipcRenderer.on(CONSTANTS.PROGRESS_UPDATE, progressHandler);
    ipcRenderer.on(CONSTANTS.DOWNLOAD, downloadResponseHandler);
    ipcRenderer.on(
      CONSTANTS.CURRENT_DOWNLOAD_META_DATA,
      currentDownloadHandler
    );
  }, []);

  const cancel = () => {
    ipcRenderer.sendMessage(CONSTANTS.CANCEL_DOWNLOAD, []);
    stopAndReset();
  };

  const download = (url: string) => {
    setIsDownloading(true);
    // @ts-ignore
    ipcRenderer.sendMessage(CONSTANTS.DOWNLOAD, {
      url,
    });
  };

  return {
    isDownloading,
    download,
    progress,
    currentSongTitle,
    cancel,
  };
};

export default useDownload;
