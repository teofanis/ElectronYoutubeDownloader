import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItemControls } from 'components';

describe('DownloadableItemControls Test', () => {
  it('should render', () => {
    expect(
      render(<DownloadableItemControls show>Test</DownloadableItemControls>)
    ).toBeTruthy();
  });
});
