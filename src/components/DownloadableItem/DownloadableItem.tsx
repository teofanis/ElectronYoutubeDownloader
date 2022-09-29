/* eslint-disable no-lone-blocks */
import {
  Button,
  DownloadableItemControls,
  DownloadItemControl,
  ProgressBar,
} from 'components';
import useDownload from 'hooks/useDownload';
import useEffectOnce from 'hooks/useEffectOnce';
import useHover from 'hooks/useHover';
import { DownloadQueueItem } from 'interfaces';
import { useRef, useState } from 'react';

interface DownloadableItemProps {
  item: DownloadQueueItem;
  onCancel: (url: string) => void;
}

const DownloadableItem = ({ item, onCancel }: DownloadableItemProps) => {
  const [url, setUrl] = useState(item.url);
  const { isDownloading, progress, download, cancel, currentSongTitle } =
    useDownload(url);

  useEffectOnce(() => download(url));
  const downloadableRef = useRef(null);
  const isHover = useHover(downloadableRef);

  const cancelClickHandler = () => {
    cancel();
    onCancel(url);
  };

  return (
    <div className="w-full flex flex-wrap space-y-2 relative">
      <ProgressBar
        progress={progress}
        text={currentSongTitle || 'Loading....'}
      />
      <div
        ref={downloadableRef}
        className="absolute top-8 w-full h-6 cursor-pointer"
      >
        <DownloadableItemControls show={isHover}>
          <DownloadItemControl>
            <Button
              className="bg-primary-red text-white
      hover:bg-red-400 h-6"
              onClick={cancelClickHandler}
              disabled={!isHover}
            >
              Cancel
            </Button>
          </DownloadItemControl>
        </DownloadableItemControls>
      </div>
    </div>
  );
};

export default DownloadableItem;
