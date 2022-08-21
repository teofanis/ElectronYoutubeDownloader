import { FileInput, TextInput } from 'components';
import { DownloadButton } from 'components/DownloadButton';
import { useState } from 'react';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  return (
    <div className="max-w-[1500px] mt-10">
      <div className="flex items-baseline space-x-4 justify-around">
        <TextInput
          name="url"
          value={url}
          onChange={urlChangeHandler}
          placeholder="Enter Youtube URL"
        />
        <span className="flex font-semibold text-white text-xl">OR</span>
        <div className="flex flex-1">
          <FileInput name="sourceList" label="Choose a File" id="sourceList" />
        </div>
      </div>
      <hr className="mt-10" />

      <div className="flex justify-center mt-10">
        <DownloadButton text="Download" />
      </div>
    </div>
  );
};

export default Downloader;
