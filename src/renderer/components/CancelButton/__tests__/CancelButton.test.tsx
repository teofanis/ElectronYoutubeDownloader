import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CancelButton } from 'renderer/components';

describe('CancelButton Test', () => {
  it('should render', () => {
    expect(render(<CancelButton text="test" />)).toBeTruthy();
  });

  it('should render correctly with class and text', () => {
    const { container } = render(
      <CancelButton text="test" className="bg-red-500" />
    );
    expect(container).toHaveTextContent('test');
    expect(container.querySelector('button')).toHaveClass(
      'bg-primary-red text-white hover:bg-red-400'
    );
  });

  it('can be clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <CancelButton text="test" onClick={onClick} />
    );
    expect(container.querySelector('button')).not.toBeDisabled();
    container.querySelector('button')?.click();
    expect(onClick).toBeCalled();
  });
});
