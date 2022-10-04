/* eslint-disable no-nested-ternary */
import { DownloadQueue } from 'interfaces';
import { Button, CancelButton, DownloadButton } from 'renderer/components';

interface DownloaderControlsProps {
  hasActiveDownloads: boolean;
  downloadHasStarted: boolean;
  disableDownloadButton: boolean;
  downloadClickHandler: () => void;
  clearClickHandler: () => void;
  cancelClickHandler: () => void;
  downloadQueue: DownloadQueue;
}

const DownloaderControls = ({
  hasActiveDownloads,
  downloadHasStarted,
  disableDownloadButton,
  downloadClickHandler,
  clearClickHandler,
  cancelClickHandler,
  downloadQueue,
}: DownloaderControlsProps) => {
  const cancelableLength = downloadQueue.filter(
    (item) => item.status === 'downloading'
  ).length;
  const downloadableLength = downloadQueue.filter(
    (item) => item.status === 'idle'
  ).length;

  const clearableLength = downloadQueue.length;
  return (
    <div className="flex justify-center mt-10">
      {downloadHasStarted && hasActiveDownloads ? (
        <CancelButton
          onClick={cancelClickHandler}
          text={`Cancel${cancelableLength > 1 ? ` (${cancelableLength})` : ''}`}
          disabled={!downloadHasStarted}
        />
      ) : downloadHasStarted ? (
        <Button
          className="bg-gray-300
      hover:bg-gray-100"
          onClick={clearClickHandler}
        >
          {`Clear${clearableLength > 0 ? ` (${clearableLength})` : ''}`}
        </Button>
      ) : (
        <DownloadButton
          text={`Download${
            downloadableLength > 0 ? ` (${downloadableLength})` : ''
          }`}
          onClick={downloadClickHandler}
          disabled={disableDownloadButton}
        />
      )}
    </div>
  );
};

export default DownloaderControls;
