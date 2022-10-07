import { useIpc } from 'renderer/context/AppContext';

const useDownloaderChannel = () => {
  const channel = 'downloader-channel';
  const { send } = useIpc(channel);
  return {
    send,
  };
};

export default useDownloaderChannel;
