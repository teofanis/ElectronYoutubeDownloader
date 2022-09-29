import {
  CancelButton,
  DownloadableItem,
  DownloadButton,
  FileInput,
  InputError,
  TextInput,
} from 'components';
import React, { useEffect, useRef, useState } from 'react';
import { validateYoutubeLink } from 'utils';
import store, { MainStore } from '../../store/store';

const Downloader = () => {
  const downloadQueue = store.useStore((state) => state.downloadQueue);
  const [downloadHasStarted, setDownloadHasStarted] = useState(false);
  const [urlError, setUrlError] = useState('');
  const textInputRef = useRef<HTMLInputElement>(null);

  function setStoreValue<T>(key: keyof MainStore, value: T) {
    const currentState = store.getState();
    store.setState({ ...currentState, [key]: value });
  }
  const addToDownloadQueue = (url: string) => {
    const newDownloadQueue = [...downloadQueue, { url }].filter(
      (item, index, self) => self.findIndex((t) => t.url === item.url) === index
    );
    setStoreValue('downloadQueue', newDownloadQueue);
  };

  const removeItemFromDownloadQueue = (url: string) => {
    const newDownloadQueue = downloadQueue.filter((item) => item.url !== url);
    setStoreValue('downloadQueue', newDownloadQueue);
  };

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

  const downloadClickHandler = () => {
    setDownloadHasStarted(true);
    // download(url);
  };

  const cancelClickHandler = () => {
    console.log('cancel');
    setDownloadHasStarted(false);
  };

  const fileClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    // downloadFromFile();
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

  const disableDownloadButton = Boolean(urlError) || downloadQueue.length === 0;
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
          />
        </div>
      </div>
      <hr className="mt-10" />
      <div>
        {downloadHasStarted && (
          <>
            {downloadQueue.map((item) => (
              <DownloadableItem
                key={item.url}
                item={item}
                onCancel={removeItemFromDownloadQueue}
              />
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center mt-10">
        {downloadHasStarted ? (
          <CancelButton
            onClick={cancelClickHandler}
            text="Cancel"
            disabled={!downloadHasStarted}
          />
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
