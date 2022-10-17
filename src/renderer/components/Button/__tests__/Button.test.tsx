import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from 'renderer/components';

describe('Button Test', () => {
  it('should render', () => {
    expect(render(<Button>Test</Button>)).toBeTruthy();
  });

  it('should render with text', () => {
    const { container } = render(<Button>Test</Button>);
    expect(container).toHaveTextContent('Test');
  });

  it('should render with text and className', () => {
    const { container } = render(<Button className="bg-red-500">Test</Button>);
    expect(container).toHaveTextContent('Test');
    expect(container.querySelector('button')).toHaveClass('bg-red-500');
  });

  it('can be disabled', () => {
    const { container } = render(<Button disabled>Test</Button>);
    expect(container.querySelector('button')).toBeDisabled();
  });

  it('can be clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick}>Test</Button>);
    expect(container.querySelector('button')).not.toBeDisabled();
    container.querySelector('button')?.click();
    expect(onClick).toBeCalled();
  });
});
