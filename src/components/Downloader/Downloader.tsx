import { DownloadButton, FileInput, InputError, TextInput } from 'components';
import { useState } from 'react';
import { validateYoutubeLink } from 'utils';
import { downloadMP3 } from '../../libs/youtube-dl';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

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
    console.log('Downloading...');
    downloadMP3(url)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
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
          <FileInput name="sourceList" label="Choose a File" id="sourceList" />
        </div>
      </div>
      <hr className="mt-10" />

      <div className="flex justify-center mt-10">
        <DownloadButton
          text="Download"
          onClick={downloadClickHandler}
          disabled={disableDownloadButton}
        />
      </div>
    </div>
  );
};

export default Downloader;
