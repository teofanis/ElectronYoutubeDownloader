import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ArrowIcon } from 'renderer/components';

describe('ArrowIcon Test', () => {
  it('should render', () => {
    expect(render(<ArrowIcon type="left" />)).toBeTruthy();
    expect(render(<ArrowIcon type="right" />)).toBeTruthy();
  });

  it('should render left arrow', () => {
    const { container } = render(<ArrowIcon type="left" />);
    expect(container).toMatchSnapshot();
  });

  it('should render right arrow', () => {
    const { container } = render(<ArrowIcon type="right" />);
    expect(container).toMatchSnapshot();
  });
});
