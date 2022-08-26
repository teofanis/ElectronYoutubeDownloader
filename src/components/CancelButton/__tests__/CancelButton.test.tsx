import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CancelButton } from 'components';

describe('CancelButton Test', () => {
  it('should render', () => {
    expect(render(<CancelButton text="test" />)).toBeTruthy();
  });
});
