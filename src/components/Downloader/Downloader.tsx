import {
  CancelButton,
  DownloadableItem,
  DownloadButton,
  FileInput,
  InputError,
  TextInput,
} from 'components';
import { DownloadQueue } from 'interfaces';
import React, { useState } from 'react';
import { validateYoutubeLink } from 'utils';

const Downloader = () => {
  const [downloadHasStarted, setDownloadHasStarted] = useState(false);
  const [downloadQueue, setDownloadQueue] = useState<DownloadQueue>([]);
  const [urlError, setUrlError] = useState('');

  const addToDownloadQueue = (url: string) => {
    const newDownloadQueue = [...downloadQueue, { url }].filter(
      (item, index, self) => self.findIndex((t) => t.url === item.url) === index
    );
    setDownloadQueue(newDownloadQueue);
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

  const disableDownloadButton = Boolean(urlError) || downloadQueue.length === 0;
  return (
    <div className="max-w-[1500px] mt-10">
      <div className="flex items-baseline space-x-4 justify-around">
        <div className="flex flex-wrap flex-1">
          <TextInput
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
        {/* temp */}
        {!downloadHasStarted && (
          <>
            {downloadQueue.map((item) => (
              <DownloadableItem key={item.url} item={item} />
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
