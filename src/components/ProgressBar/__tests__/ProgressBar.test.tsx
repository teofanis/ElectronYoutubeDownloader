import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProgressBar } from 'components';

describe('ProgressBar Test', () => {
  it('should render', () => {
    expect(render(<ProgressBar progress={0} />)).toBeTruthy();
  });
});
