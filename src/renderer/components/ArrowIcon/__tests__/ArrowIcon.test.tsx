import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ArrowIcon } from 'renderer/components';

describe('ArrowIcon Test', () => {
  it('should render', () => {
    expect(render(<ArrowIcon type="left" />)).toBeTruthy();
  });
});
