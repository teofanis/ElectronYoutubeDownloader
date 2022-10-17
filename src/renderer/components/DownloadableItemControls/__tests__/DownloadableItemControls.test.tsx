import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItemControls } from 'renderer/components';

describe('DownloadableItemControls Test', () => {
  it('should render correctly', () => {
    expect(
      render(<DownloadableItemControls show>Test</DownloadableItemControls>)
    ).toMatchSnapshot();
  });

  it('should render correctly with show false', () => {
    const { container } = render(
      <DownloadableItemControls show={false}>Test</DownloadableItemControls>
    );
    expect(container.querySelector('div')).not.toBeInTheDocument();
  });

  it('should render correctly with show true', () => {
    const { container } = render(
      <DownloadableItemControls show>Test</DownloadableItemControls>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
