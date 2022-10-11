/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Pagination } from 'react-headless-pagination';
import {
  DownloadableItem,
  DownloadableItemTransition,
  DownloadableItemTransitionContainer,
  DownloaderControls,
  FileInput,
  InputError,
  TextInput,
} from 'renderer/components';

import { DownloadQueueItem } from 'interfaces';
import React, { useEffect, useRef, useState } from 'react';
import useDownloaderChannel from 'renderer/hooks/useDownloaderChannel';
import { paginator, validateYoutubeLink } from 'utils';

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
  const PER_PAGE = 3;

  const paginated = paginator<DownloadQueueItem>(
    downloadQueue ?? [],
    page,
    PER_PAGE
  );
  console.log(downloadQueue, paginated);
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
        {paginated.data.map((item) => (
          <DownloadableItemTransition key={item.url}>
            <DownloadableItem item={item} />
          </DownloadableItemTransition>
        ))}
      </DownloadableItemTransitionContainer>
      <Pagination
        totalPages={paginated.totalPages}
        currentPage={page}
        setCurrentPage={handlePageChange}
        className="flex items-center w-full h-10 text-sm select-none"
        truncableText="..."
        truncableClassName="w-10 px-0.5 text-center"
      >
        <Pagination.PrevButton
          className={`flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none
          ${
            paginated.prePage
              ? 'cursor-pointer'
              : 'cursor-not-allowed opacity-50'
          }`}
        >
          Previous
        </Pagination.PrevButton>

        <div className="flex items-center justify-center flex-grow">
          <Pagination.PageButton
            activeClassName="bg-primary-50 dark:bg-opacity-0 text-primary-600 dark:text-white"
            inactiveClassName="text-gray-500"
            className="flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"
          />
        </div>
        <Pagination.NextButton
          className={`flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none
                    ${
                      paginated.nextPage
                        ? 'cursor-pointer'
                        : `cursor-not-allowed opacity-50`
                    }`}
        >
          Next
        </Pagination.NextButton>
      </Pagination>
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
