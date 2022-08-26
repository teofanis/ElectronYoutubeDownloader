import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Logo } from 'components';

describe('Logo Test', () => {
  it('should render', () => {
    expect(render(<Logo>Test</Logo>)).toBeTruthy();
  });
});
