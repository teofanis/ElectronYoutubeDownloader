/* eslint-disable no-nested-ternary */
import {
  Button,
  CancelButton,
  DownloadableItem,
  DownloadButton,
  FileInput,
  InputError,
  TextInput,
} from 'components';
import useDownloaderStore from 'hooks/useDownloaderStore';
import React, { useEffect, useRef, useState } from 'react';
import { validateYoutubeLink } from 'utils';
import { CONSTANTS } from 'utils/constants';

const { ipcRenderer } = window.electron;

const openFileDialog = () => {
  const event = CONSTANTS.DOWNLOAD_FILE;
  ipcRenderer.sendMessage(event, []);
};
const Downloader = () => {
  const downloadQueue = useDownloaderStore((state) => state.downloadQueue);
  const clearCancelationCallbacks = useDownloaderStore(
    (state) => state.clearCancelationCallbacks
  );
  const cancelationCallbacks = useDownloaderStore(
    (state) => state.cancelationCallbacks
  );
  const addToDownloadQueue = useDownloaderStore(
    (state) => state.addToDownloadQueue
  );
  const clearDownloadQueue = useDownloaderStore(
    (state) => state.clearDownloadQueue
  );

  const [downloadHasStarted, setDownloadHasStarted] = useState(false);
  const [fileError, setFileError] = useState('');
  const [urlError, setUrlError] = useState('');
  const textInputRef = useRef<HTMLInputElement>(null);

  const urlBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const link = e.target.value.trim();
    if (validateYoutubeLink(link)) {
      addToDownloadQueue(link);
    }
  };

  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value.trim();
    if (link !== '' && !validateYoutubeLink(link)) {
      setUrlError('Invalid Youtube URL entered');
      return;
    }
    setUrlError('');
  };

  console.log(downloadQueue);

  const downloadClickHandler = () => setDownloadHasStarted(true);

  const clearClickHandler = () => clearDownloadQueue();
  const cancelClickHandler = () => {
    cancelationCallbacks.forEach((callback) => callback());
    clearCancelationCallbacks();
  };

  const fileClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    openFileDialog();
  };
  useEffect(() => {
    const textInputHasValue = textInputRef.current?.value.trim() !== '';
    if (textInputHasValue) {
      const textLinkIsPresent = downloadQueue.some(
        (item) => item.url === textInputRef.current?.value?.trim()
      );
      if (!textLinkIsPresent && textInputRef.current) {
        textInputRef.current.value = '';
      }
    }
  }, [downloadQueue]);

  useEffect(() => {
    if (downloadQueue.length === 0) {
      setDownloadHasStarted(false);
    }
  }, [downloadQueue]);

  const downloadFromFileHandler = (response: any): void => {
    if (response && response?.status === 'success') {
      const data = response?.data;
      const file = response?.file;
      data.forEach(addToDownloadQueue);
      console.log(data, file);
      return;
    }
    if (response?.status === 'error') {
      setFileError('Failed to download from file.');
    }
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ipcRenderer.on(CONSTANTS.DOWNLOAD_FILE, downloadFromFileHandler);
    return () => {
      ipcRenderer.removeAllListeners(CONSTANTS.DOWNLOAD_FILE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableDownloadButton = Boolean(urlError) || downloadQueue.length === 0;
  const hasActiveDownload = downloadQueue.some(
    (item) => item.status === 'downloading'
  );
  return (
    <div className="max-w-[1500px] mt-10">
      <div className="flex items-baseline space-x-4 justify-around">
        <div className="flex flex-wrap flex-1">
          <TextInput
            ref={textInputRef}
            name="url"
            onChange={urlChangeHandler}
            onBlur={urlBlurHandler}
            placeholder="Enter Youtube URL"
            errored={Boolean(urlError)}
          />
          <InputError error={urlError} />
        </div>

        <span className="flex font-semibold text-white text-xl">OR</span>
        <div className="flex flex-1">
          <FileInput
            name="sourceList"
            label="Choose a File"
            id="sourceList"
            accept=".txt"
            onClick={fileClickHandler}
            errored={Boolean(fileError)}
          />
          <InputError error={fileError} />
        </div>
      </div>
      <hr className="mt-10" />
      <div>
        {downloadHasStarted && (
          <>
            {downloadQueue.map((item) => (
              <DownloadableItem key={item.url} item={item} />
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center mt-10">
        {downloadHasStarted && hasActiveDownload ? (
          <CancelButton
            onClick={cancelClickHandler}
            text={`Cancel${
              downloadQueue.length > 1 ? ` (${downloadQueue.length})` : ''
            }`}
            disabled={!downloadHasStarted}
          />
        ) : downloadHasStarted ? (
          <Button
            className="bg-gray-300
      hover:bg-gray-100"
            onClick={clearClickHandler}
          >
            {`Clear${
              downloadQueue.length > 0 ? ` (${downloadQueue.length})` : ''
            }`}
          </Button>
        ) : (
          <DownloadButton
            text={`Download${
              downloadQueue.length > 0 ? ` (${downloadQueue.length})` : ''
            }`}
            onClick={downloadClickHandler}
            disabled={disableDownloadButton}
          />
        )}
      </div>
    </div>
  );
};

export default Downloader;
