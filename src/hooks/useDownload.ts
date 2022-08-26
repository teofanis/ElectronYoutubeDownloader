import { useEffect, useState } from 'react';
import { CONSTANTS } from 'utils/constants';
import { MoreVideoDetails } from 'ytdl-core';

const { ipcRenderer } = window.electron;

const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancel = () => {
    ipcRenderer.sendMessage(CONSTANTS.CANCEL_DOWNLOAD, []);
    stopAndReset();
  };

  const downloadFromFile = () => {
    ipcRenderer.sendMessage(CONSTANTS.DOWNLOAD_FILE, []);
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
    isDownloading,
    download,
    progress,
    currentSongTitle,
    cancel,
    downloadFromFile,
    videoMetadata,
  };
};

export default useDownload;
