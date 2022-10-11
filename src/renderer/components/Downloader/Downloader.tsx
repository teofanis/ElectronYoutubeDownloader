/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  DownloadableItem,
  DownloadableItemTransition,
  DownloadableItemTransitionContainer,
  DownloaderControls,
  FileInput,
  InputError,
  Pagination,
  TextInput,
} from 'renderer/components';

import { DownloadQueueItem } from 'interfaces';
import React, { useEffect, useRef, useState } from 'react';
import useDownloaderChannel from 'renderer/hooks/useDownloaderChannel';
import { paginator as paginate, validateYoutubeLink } from 'utils';

const Downloader = () => {
  const {
    selectFromFile,
    downloadQueue,
    addToDownloadQueue,
    startAllDownloads,
    stopAllDownloads,
    clearDownloadQueue,
  } = useDownloaderChannel();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [page, setPage] = useState(0);
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
  const downloadClickHandler = () => startAllDownloads();

  const clearClickHandler = () => clearDownloadQueue();
  const cancelClickHandler = () => stopAllDownloads();

  const fileClickHandler = async () => {
    const { response } = await selectFromFile();
    if (response && response?.status === 'success') {
      // @ts-ignore
      const file = response?.data?.file;
      // @ts-ignore
      const data = response?.data?.data ?? [];
      data.forEach(addToDownloadQueue);
      setSelectedFile(file);
    } else {
      setFileError('Failed to download from file.');
    }
  };

  useEffect(() => {
    const textInputHasValue = textInputRef.current?.value.trim() !== '';
    if (textInputHasValue) {
      const textLinkIsPresent = downloadQueue?.some(
        (item) => item.url === textInputRef.current?.value?.trim()
      );
      if (!textLinkIsPresent && textInputRef.current) {
        textInputRef.current.value = '';
      }
    }
  }, [downloadQueue]);

  const disableDownloadButton =
    Boolean(urlError) || downloadQueue?.length === 0;

  const handlePageChange = (selectedPage: number) => {
    console.log(selectedPage);
    setPage(selectedPage);
  };
  const PER_PAGE = 1;

  const paginator = paginate<DownloadQueueItem>(
    downloadQueue ?? [],
    page,
    PER_PAGE
  );
  console.log(downloadQueue, paginator);
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
        <div className="flex flex-1 flex-wrap">
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
      <DownloadableItemTransitionContainer
        show={Boolean(downloadQueue?.length)}
      >
        {paginator.data.map((item) => (
          <DownloadableItemTransition key={item.url}>
            <DownloadableItem item={item} />
          </DownloadableItemTransition>
        ))}
      </DownloadableItemTransitionContainer>
      <div className="w-full flex justify-center pt-10">
        <Pagination
          currentPage={page}
          pageHandler={handlePageChange}
          paginator={paginator}
        />
      </div>
      <DownloaderControls
        disableDownloadButton={disableDownloadButton}
        downloadClickHandler={downloadClickHandler}
        clearClickHandler={clearClickHandler}
        cancelClickHandler={cancelClickHandler}
        downloadQueue={downloadQueue ?? []}
      />
    </div>
  );
};

export default Downloader;
