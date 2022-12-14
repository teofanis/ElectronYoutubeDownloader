/* eslint-disable promise/always-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-lone-blocks */
import { DownloadQueueItem } from 'interfaces';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  DownloadableItemControls,
  DownloadItemControl,
  ProgressBar,
} from 'renderer/components';
import useDownloaderChannel from 'renderer/hooks/useDownloaderChannel';
import useHover from 'renderer/hooks/useHover';

interface DownloadableItemProps {
  item: DownloadQueueItem;
}

const DownloadableItem = ({ item }: DownloadableItemProps) => {
  const [url] = useState(item.url);
  const [loading, setLoading] = useState(false);
  const {
    startDownload,
    getProgress,
    getDownloadableItem,
    cancelDownload,
    removeFromDownloadQueue,
    loadLinkMetadata,
  } = useDownloaderChannel();
  const downloadableItem = getDownloadableItem(url);

  useEffect(() => {
    if (downloadableItem && !downloadableItem?.metadata) {
      setLoading(true);
      loadLinkMetadata(url);
    } else if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadableItem]);

  const progress = Number(getProgress(url)).toFixed(2);

  const downloadableRef = useRef(null);
  const isHover = useHover(downloadableRef);

  const cancelClickHandler = () => cancelDownload(url);
  const clearClickHandler = () => removeFromDownloadQueue(url);
  const retryClickHandler = () => startDownload(url);

  const currentSongTitle = downloadableItem?.metadata?.title || '';
  const enqueued = downloadableItem?.status === 'enqueued';
  const started = downloadableItem?.status !== 'idle';
  const cancelled = downloadableItem?.status === 'cancelled';
  const errored = downloadableItem?.status === 'error';
  const downloading = downloadableItem?.status === 'downloading';
  const downloadedSuccessfully = downloadableItem?.status === 'downloaded';
  const converting = downloadableItem?.status === 'converting';

  const progressText = loading
    ? 'Loading...'
    : !started
    ? `${currentSongTitle} click to start download`
    : enqueued
    ? `${currentSongTitle} queued for download`
    : downloading
    ? `Downloading ${currentSongTitle}`
    : downloadedSuccessfully
    ? `${currentSongTitle} downloaded successfully`
    : converting
    ? `Converting ${currentSongTitle}`
    : cancelled
    ? `${currentSongTitle} cancelled`
    : errored
    ? `${currentSongTitle} could not start download`
    : currentSongTitle || 'Loading...';
  const buttonText = !started
    ? 'Remove'
    : downloadedSuccessfully || errored || cancelled
    ? `Clear`
    : `Cancel`;
  return (
    <div className="w-full flex flex-wrap space-y-2 relative mt-4">
      <ProgressBar
        progress={progress}
        text={progressText}
        hidePercentage={
          !started || downloadedSuccessfully || errored || cancelled
        }
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

          {!started && (
            <DownloadItemControl>
              <Button
                className="bg-green-400 text-white
      hover:bg-green-300 h-6"
                onClick={() => startDownload(url)}
                disabled={!isHover}
              >
                Download
              </Button>
            </DownloadItemControl>
          )}

          <DownloadItemControl>
            <Button
              className="bg-primary-red text-white
      hover:bg-red-400 h-6"
              onClick={
                downloadedSuccessfully || errored || cancelled || !started
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
