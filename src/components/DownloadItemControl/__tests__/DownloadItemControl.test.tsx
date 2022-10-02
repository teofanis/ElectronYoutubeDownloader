import { Transition } from '@headlessui/react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadItemControl } from 'components';

describe('DownloadItemControl Test', () => {
  it('should render', () => {
    expect(
      render(
        <Transition show>
          <DownloadItemControl>Test</DownloadItemControl>
        </Transition>
      )
    ).toBeTruthy();
  });
});
