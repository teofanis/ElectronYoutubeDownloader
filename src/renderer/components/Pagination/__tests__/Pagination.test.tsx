import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Pagination } from 'renderer/components';

describe('Pagination Test', () => {
  it('should render', () => {
    expect(render(<Pagination>Test</Pagination>)).toBeTruthy();
  });
});
