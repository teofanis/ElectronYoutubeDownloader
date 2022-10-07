import { DownloaderActions } from 'main/actions/Downloader';
import { useCallback } from 'react';
import { useIpc } from 'renderer/context/AppContext';
import useStore from './useStore';

const useDownloaderChannel = () => {
  const channel = 'downloader-channel';
  const { send } = useIpc(channel);

  const downloadQueue = useStore(
    useCallback((state) => state.downloadQueue, [])
  );
  const addToDownloadQueue = async (url: string) => {
    send(DownloaderActions.ADD_TO_DOWNLOAD_QUEUE, { url });
  };

  return {
    addToDownloadQueue,
    downloadQueue,
  };
};

export default useDownloaderChannel;
