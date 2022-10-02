import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloaderControls } from 'components';

describe('DownloaderControls Test', () => {
  it('should render', () => {
    expect(render(<DownloaderControls>Test</DownloaderControls>)).toBeTruthy();
  });
});
