import { Transition } from '@headlessui/react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItemTransition } from 'components';

describe('DownloadableItemTransition Test', () => {
  it('should render', () => {
    expect(
      render(
        <Transition show>
          <DownloadableItemTransition>Test</DownloadableItemTransition>
        </Transition>
      )
    ).toBeTruthy();
  });
});
