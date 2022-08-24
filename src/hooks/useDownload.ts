import { useEffect, useState } from 'react';
import { CONSTANTS } from 'utils/constants';
import { MoreVideoDetails } from 'ytdl-core';

const { ipcRenderer } = window.electron;

const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [cancelDownload, setCancelDownload] = useState(() => {});
  const [currentSongTitle, setCurrentSongTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<MoreVideoDetails>();

  const progressHandler = (event: any, data) => {
    console.log(event, 'WTF');

    setProgress(event);
  };

  const downloadResponseHandler = (event: any, data) => {
    console.log(event);
    console.log(data);
    console.log('Download response handler');
    setIsDownloading(false);
  };

  const currentDownloadHandler = (data: any) => {
    console.log('Metadata');
    const { title, videoDetails, cancel } = data;
    setCurrentSongTitle(title);
    setVideoMetadata(videoDetails);
    setCancelDownload(cancel);
    console.log(data);
  };
  useEffect(() => {
    ipcRenderer.on(CONSTANTS.PROGRESS_UPDATE, progressHandler);
    ipcRenderer.on(CONSTANTS.DOWNLOAD, downloadResponseHandler);
    ipcRenderer.on(
      CONSTANTS.CURRENT_DOWNLOAD_META_DATA,
      currentDownloadHandler
    );
  }, []);

  const download = (url: string) => {
    setIsDownloading(true);
    // @ts-ignore
    ipcRenderer.sendMessage(CONSTANTS.DOWNLOAD, {
      url,
    });
  };

  if (progress) {
    console.log(progress);
    console.log('hook');
  }

  return {
    isDownloading,
    cancelDownload,
    download,
    progress,
    currentSongTitle,
  };
};

export default useDownload;
