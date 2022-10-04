import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloaderControls } from 'renderer/components';

describe('DownloaderControls Test', () => {
  it('should render', () => {
    expect(
      render(
        <DownloaderControls
          hasActiveDownloads={false}
          downloadHasStarted={false}
          disableDownloadButton={false}
          downloadClickHandler={jest.fn()}
          clearClickHandler={jest.fn()}
          cancelClickHandler={jest.fn()}
          downloadQueueLength={0}
        />
      )
    ).toBeTruthy();
  });
});
