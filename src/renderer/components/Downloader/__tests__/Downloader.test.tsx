import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Downloader } from 'renderer/components';

describe('Downloader Test', () => {
  it('should render', () => {
    expect(render(<Downloader />)).toBeTruthy();
  });
});
