import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadItemControl } from 'components';

describe('DownloadItemControl Test', () => {
  it('should render', () => {
    expect(render(<DownloadItemControl>Test</DownloadItemControl>)).toBeTruthy();
  });
});
