import {
  DownloadableItem,
  DownloadableItemTransition,
  DownloadableItemTransitionContainer,
  DownloaderControls,
  FileInput,
  InputError,
  TextInput,
} from 'renderer/components';

import React, { useEffect, useRef, useState } from 'react';
import useDownloaderChannel from 'renderer/hooks/useDownloaderChannel';
import useDownloaderStore from 'renderer/hooks/useDownloaderStore';
import { validateYoutubeLink } from 'utils';

// const { ipcRenderer } = window.electron;

// const openFileDialog = () => {
//   const event = CONSTANTS.DOWNLOAD_FILE;
//   ipcRenderer.sendMessage(event, []);
// };
const Downloader = () => {
  const {
    addToDownloadQueue: addToDownloadQueue1,
    downloadQueue: downloadQueue1,
  } = useDownloaderChannel();

  const openFileDialog = async () => {
    const response = await addToDownloadQueue1('great');
    console.log(downloadQueue1);
    // window.electron.store.setState((state) => {
    //   state.downloadQueue.push('x');
    // });
  };

  console.log(downloadQueue1);
  // console.log(window.electron.ipc);
  // window.electron.ipc.send('downloader-channel', {});
  const downloadQueue = useDownloaderStore((state) => state.downloadQueue);
  const removeCancelationCallback = useDownloaderStore(
    (state) => state.removeCancelationCallback
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
  const getDownloadQueueItem = useDownloaderStore(
    (state) => state.getDownloadQueueItem
  );
  const [selectedFile, setSelectedFile] = useState(null);
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

  console.log(cancelationCallbacks);

  const downloadClickHandler = () => setDownloadHasStarted(true);

  const clearClickHandler = () => clearDownloadQueue();
  const cancelClickHandler = () => {
    const cancellableStatuses = ['downloading', 'idle'];
    cancelationCallbacks.forEach(({ link, cancel }) => {
      const item = getDownloadQueueItem(link);
      if (cancellableStatuses?.includes(item?.status || '')) {
        cancel();
        removeCancelationCallback(link);
      }
    });
  };

  const fileClickHandler = () => {
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
      setSelectedFile(file);
      return;
    }
    if (response?.status === 'error') {
      setFileError('Failed to download from file.');
    }
  };
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   ipcRenderer?.on(CONSTANTS.DOWNLOAD_FILE, downloadFromFileHandler);
  //   return () => {
  //     ipcRenderer.removeAllListeners(CONSTANTS.DOWNLOAD_FILE);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            label={selectedFile ? 'Selected File' : 'Choose a File'}
            id="sourceList"
            accept=".txt"
            onClick={fileClickHandler}
            errored={Boolean(fileError)}
            value={selectedFile || ''}
          />
          <InputError error={fileError} />
        </div>
      </div>
      <hr className="mt-10" />
      <DownloadableItemTransitionContainer show={downloadHasStarted}>
        {downloadQueue.map((item) => (
          <DownloadableItemTransition key={item.url}>
            <DownloadableItem item={item} />
          </DownloadableItemTransition>
        ))}
      </DownloadableItemTransitionContainer>

      <DownloaderControls
        disableDownloadButton={disableDownloadButton}
        hasActiveDownloads={hasActiveDownload}
        downloadClickHandler={downloadClickHandler}
        clearClickHandler={clearClickHandler}
        cancelClickHandler={cancelClickHandler}
        downloadHasStarted={downloadHasStarted}
        downloadQueue={downloadQueue}
      />
    </div>
  );
};

export default Downloader;
