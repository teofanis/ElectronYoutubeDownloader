import { useEffect, useState } from 'react';
import { CONSTANTS } from 'utils/constants';

const { ipcRenderer } = window.electron;

const useDownload = () => {
  const [progress, setProgress] = useState(0);

  const progressHandler = (event: any, data) => {
    console.log(event, 'WTF');

    setProgress(event);
  };

  const downloadResponseHandler = (event: any, data) => {
    console.log(event);
    console.log(data);
    console.log('Download response handler');
  };

  useEffect(() => {
    ipcRenderer.on(CONSTANTS.PROGRESS_UPDATE, progressHandler);
    ipcRenderer.on(CONSTANTS.DOWNLOAD, downloadResponseHandler);
  }, []);

  const download = (url: string) => {
    // @ts-ignore
    ipcRenderer.sendMessage(CONSTANTS.DOWNLOAD, {
      url,
    });
  };

  if (progress) {
    console.log(progress);
    console.log('hook');
  }

  return { download, progress };
};

export default useDownload;
