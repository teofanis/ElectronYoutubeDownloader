import {
  CancelButton,
  DownloadButton,
  FileInput,
  InputError,
  ProgressBar,
  TextInput,
} from 'components';
import useDownload from 'hooks/useDownload';
// import { ipcRenderer } from 'electron';
import { useState } from 'react';
import { validateYoutubeLink } from 'utils';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const {
    isDownloading,
    progress,
    download,
    cancel,
    currentSongTitle,
    downloadFromFile,
  } = useDownload();
  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value.trim();
    if (link !== '' && !validateYoutubeLink(link)) {
      setUrlError('Invalid Youtube URL entered');
      return;
    }
    setUrlError('');
    setUrl(link);
  };

  const downloadClickHandler = () => {
    download(url);
  };

  const fileClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    downloadFromFile();
  };

  const disableDownloadButton = Boolean(urlError) || !url;
  return (
    <div className="max-w-[1500px] mt-10">
      <div className="flex items-baseline space-x-4 justify-around">
        <div className="flex flex-wrap flex-1">
          <TextInput
            name="url"
            onChange={urlChangeHandler}
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
            onClick={fileClickHandler}
          />
        </div>
      </div>
      <hr className="mt-10" />

      <div className="block h-6 mt-10">
        {isDownloading && (
          <ProgressBar progress={progress} text={currentSongTitle} />
        )}
      </div>
      <div className="flex justify-center mt-10">
        {isDownloading ? (
          <CancelButton
            onClick={cancel}
            text="Cancel"
            disabled={!isDownloading}
          />
        ) : (
          <DownloadButton
            text="Download"
            onClick={downloadClickHandler}
            disabled={disableDownloadButton}
          />
        )}
      </div>
    </div>
  );
};

export default Downloader;
