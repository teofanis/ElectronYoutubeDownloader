import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItem } from 'components';

describe('DownloadableItem Test', () => {
  it('should render', () => {
    expect(render(<DownloadableItem>Test</DownloadableItem>)).toBeTruthy();
  });
});
