import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadButton } from 'components';

describe('DownloadButton Test', () => {
  it('should render', () => {
    expect(render(<DownloadButton>Test</DownloadButton>)).toBeTruthy();
  });
});
