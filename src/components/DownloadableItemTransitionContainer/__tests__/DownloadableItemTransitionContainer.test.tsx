import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadableItemTransitionContainer } from 'components';

describe('DownloadableItemTransitionContainer Test', () => {
  it('should render', () => {
    expect(
      render(
        <DownloadableItemTransitionContainer show>
          Test
        </DownloadableItemTransitionContainer>
      )
    ).toBeTruthy();
  });
});
