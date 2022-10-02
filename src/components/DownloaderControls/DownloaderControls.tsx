/* eslint-disable no-nested-ternary */
import { Button, CancelButton, DownloadButton } from 'components';

interface DownloaderControlsProps {
  hasActiveDownloads: boolean;
  downloadHasStarted: boolean;
  disableDownloadButton: boolean;
  downloadClickHandler: () => void;
  clearClickHandler: () => void;
  cancelClickHandler: () => void;
  downloadQueueLength: number;
}

const DownloaderControls = ({
  hasActiveDownloads,
  downloadHasStarted,
  disableDownloadButton,
  downloadClickHandler,
  clearClickHandler,
  cancelClickHandler,
  downloadQueueLength,
}: DownloaderControlsProps) => {
  return (
    <div className="flex justify-center mt-10">
      {downloadHasStarted && hasActiveDownloads ? (
        <CancelButton
          onClick={cancelClickHandler}
          text={`Cancel${
            downloadQueueLength > 1 ? ` (${downloadQueueLength})` : ''
          }`}
          disabled={!downloadHasStarted}
        />
      ) : downloadHasStarted ? (
        <Button
          className="bg-gray-300
      hover:bg-gray-100"
          onClick={clearClickHandler}
        >
          {`Clear${downloadQueueLength > 0 ? ` (${downloadQueueLength})` : ''}`}
        </Button>
      ) : (
        <DownloadButton
          text={`Download${
            downloadQueueLength > 0 ? ` (${downloadQueueLength})` : ''
          }`}
          onClick={downloadClickHandler}
          disabled={disableDownloadButton}
        />
      )}
    </div>
  );
};

export default DownloaderControls;
