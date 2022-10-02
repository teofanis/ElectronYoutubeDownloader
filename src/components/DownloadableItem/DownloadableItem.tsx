/* eslint-disable no-nested-ternary */
/* eslint-disable no-lone-blocks */
import {
  Button,
  DownloadableItemControls,
  DownloadItemControl,
  ProgressBar,
} from 'components';
import useDownload from 'hooks/useDownload';
import useDownloaderStore from 'hooks/useDownloaderStore';
import useEffectOnce from 'hooks/useEffectOnce';
import useHover from 'hooks/useHover';
import { DownloadQueueItem } from 'interfaces';
import { useRef, useState } from 'react';

interface DownloadableItemProps {
  item: DownloadQueueItem;
}

const DownloadableItem = ({ item }: DownloadableItemProps) => {
  const [url] = useState(item.url);
  const { progress, download, cancel, currentSongTitle, downloadableItem } =
    useDownload(url);
  const removeFromDownloadQueue = useDownloaderStore(
    (state) => state.removeFromDownloadQueue
  );
  useEffectOnce(() => download(url));
  const downloadableRef = useRef(null);
  const isHover = useHover(downloadableRef);

  const cancelClickHandler = () => cancel();
  const clearClickHandler = () => removeFromDownloadQueue(url);
  const retryClickHandler = () => download(url);

  const cancelled = downloadableItem?.status === 'cancelled';
  const errored = downloadableItem?.status === 'error';
  const downloadedSuccessfully = downloadableItem?.status === 'downloaded';

  const progressText = downloadedSuccessfully
    ? `${currentSongTitle} downloaded successfully`
    : cancelled
    ? `${currentSongTitle} cancelled`
    : errored
    ? `${currentSongTitle} could not be downloaded at this time`
    : currentSongTitle || 'Loading...';
  const buttonText =
    downloadedSuccessfully || errored || cancelled ? `Clear` : `Cancel`;
  return (
    <div className="w-full flex flex-wrap space-y-2 relative mt-4">
      <ProgressBar
        progress={progress}
        text={progressText}
        hidePercentage={downloadedSuccessfully || errored || cancelled}
      />
      <div
        ref={downloadableRef}
        className="absolute bottom-0 w-full h-6 cursor-pointer"
      >
        <DownloadableItemControls show={isHover}>
          {errored ||
            (cancelled && (
              <DownloadItemControl>
                <Button
                  className="bg-green-400 text-white
      hover:bg-green-300 h-6"
                  onClick={retryClickHandler}
                  disabled={!isHover}
                >
                  Retry
                </Button>
              </DownloadItemControl>
            ))}
          <DownloadItemControl>
            <Button
              className="bg-primary-red text-white
      hover:bg-red-400 h-6"
              onClick={
                downloadedSuccessfully || errored || cancelled
                  ? clearClickHandler
                  : cancelClickHandler
              }
              disabled={!isHover}
            >
              {buttonText}
            </Button>
          </DownloadItemControl>
        </DownloadableItemControls>
      </div>
    </div>
  );
};

export default DownloadableItem;
