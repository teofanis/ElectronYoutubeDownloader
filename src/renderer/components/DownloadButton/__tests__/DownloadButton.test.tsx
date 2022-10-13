import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadButton } from 'renderer/components';

describe('DownloadButton Test', () => {
  it('should render', () => {
    expect(render(<DownloadButton text="test" />)).toBeTruthy();
  });
});
