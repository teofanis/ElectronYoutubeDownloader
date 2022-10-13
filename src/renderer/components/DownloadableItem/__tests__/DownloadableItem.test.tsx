import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItem } from 'renderer/components';

describe('DownloadableItem Test', () => {
  it('should render', () => {
    expect(
      render(
        <DownloadableItem
          item={{
            url: '',
            status: 'error',
          }}
        />
      )
    ).toBeTruthy();
  });
});
