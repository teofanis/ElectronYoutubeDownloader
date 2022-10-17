import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItemTransitionContainer } from 'renderer/components';

describe('DownloadableItemTransitionContainer Test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <DownloadableItemTransitionContainer show>
          Test
        </DownloadableItemTransitionContainer>
      )
    ).toMatchSnapshot();
  });

  it('should render correctly with show false', () => {
    const { container } = render(
      <DownloadableItemTransitionContainer show={false}>
        Test
      </DownloadableItemTransitionContainer>
    );
    expect(container.querySelector('div')).not.toBeInTheDocument();
  });

  it('should render correctly with show true', () => {
    const { container } = render(
      <DownloadableItemTransitionContainer show>
        Test
      </DownloadableItemTransitionContainer>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
