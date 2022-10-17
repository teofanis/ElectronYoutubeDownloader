import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { DownloadQueue } from 'interfaces';
import { DownloaderControls } from 'renderer/components';

describe('DownloaderControls Test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <DownloaderControls
          disableDownloadButton={false}
          downloadClickHandler={jest.fn}
          clearClickHandler={jest.fn}
          cancelClickHandler={jest.fn}
          downloadQueue={[]}
        />
      )
    ).toMatchSnapshot();
  });

  it('should render correctly with downloadQueue 1', () => {
    const downloadQueue = [
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=1',
      },
      {
        status: 'downloading',
        url: 'https://www.youtube.com/watch?v=2',
      },
      {
        status: 'enqueued',
        url: 'https://www.youtube.com/watch?v=3',
      },
    ] as DownloadQueue;

    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={downloadQueue}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Cancel (2)');
  });

  it('should render correctly with downloadQueue 2', () => {
    const downloadQueue = [
      {
        status: 'cancelled',
        url: 'https://www.youtube.com/watch?v=1',
      },
      {
        status: 'downloading',
        url: 'https://www.youtube.com/watch?v=2',
      },
      {
        status: 'enqueued',
        url: 'https://www.youtube.com/watch?v=3',
      },
    ] as DownloadQueue;

    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={downloadQueue}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Cancel');
  });

  it('should render correctly with downloadQueue 3', () => {
    const downloadQueue = [
      {
        status: 'cancelled',
        url: 'https://www.youtube.com/watch?v=1',
      },
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=2',
      },
      {
        status: 'errored',
        url: 'https://www.youtube.com/watch?v=3',
      },
    ] as DownloadQueue;

    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={downloadQueue}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Clear (3)');
  });

  it('should render correctly with downloadQueue 4', () => {
    const downloadQueue = [
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=1',
      },
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=2',
      },
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=3',
      },
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=3',
      },
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=3',
      },
    ] as DownloadQueue;

    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={downloadQueue}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Download (5)');
  });

  it('should render correctly with downloadQueue 5', () => {
    const downloadQueue = [
      {
        status: 'cancelled',
        url: 'https://www.youtube.com/watch?v=1',
      },
    ] as DownloadQueue;

    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={downloadQueue}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Clear');
  });

  it('should render correctly with downloadQueue 6', () => {
    const downloadQueue = [
      {
        status: 'idle',
        url: 'https://www.youtube.com/watch?v=1',
      },
    ] as DownloadQueue;

    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={downloadQueue}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Download');
  });

  it('should render correctly with downloadQueue 7', () => {
    const { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={[]}
      />
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(container.querySelector('button')).toHaveTextContent('Download');
  });

  it('can handle clicks correctly', () => {
    const downloadClickHandler = jest.fn();
    const clearClickHandler = jest.fn();
    const cancelClickHandler = jest.fn();

    let { container } = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={downloadClickHandler}
        clearClickHandler={clearClickHandler}
        cancelClickHandler={cancelClickHandler}
        downloadQueue={[
          {
            status: 'idle',
            url: 'https://www.youtube.com/watch?v=1',
          },
        ]}
      />
    );

    let actionButton = container.querySelector('button') as HTMLButtonElement;
    expect(actionButton).toHaveTextContent('Download');
    fireEvent.click(actionButton);
    expect(downloadClickHandler).toHaveBeenCalledTimes(1);

    container = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={downloadClickHandler}
        clearClickHandler={clearClickHandler}
        cancelClickHandler={cancelClickHandler}
        downloadQueue={[
          {
            status: 'downloading',
            url: 'https://www.youtube.com/watch?v=1',
          },
        ]}
      />
    ).container;

    actionButton = container.querySelector('button') as HTMLButtonElement;
    expect(actionButton).toHaveTextContent('Cancel');

    fireEvent.click(actionButton);
    expect(cancelClickHandler).toHaveBeenCalledTimes(1);

    container = render(
      <DownloaderControls
        disableDownloadButton={false}
        downloadClickHandler={downloadClickHandler}
        clearClickHandler={clearClickHandler}
        cancelClickHandler={cancelClickHandler}
        downloadQueue={[
          {
            status: 'cancelled',
            url: 'https://www.youtube.com/watch?v=1',
          },
        ]}
      />
    ).container;
    actionButton = container.querySelector('button') as HTMLButtonElement;
    expect(actionButton).toHaveTextContent('Clear');
    fireEvent.click(actionButton);
    expect(clearClickHandler).toHaveBeenCalledTimes(1);
  });

  it('can disable download button', () => {
    const { container } = render(
      <DownloaderControls
        disableDownloadButton
        downloadClickHandler={jest.fn}
        clearClickHandler={jest.fn}
        cancelClickHandler={jest.fn}
        downloadQueue={[]}
      />
    );
    expect(container.querySelector('button')).toBeDisabled();
  });
});
