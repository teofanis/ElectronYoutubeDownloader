import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { InputError } from 'renderer/components';

describe('InputError Test', () => {
  it('should render correctly', () => {
    const { container } = render(<InputError />);
    expect(container.querySelector('span')).toBeNull();

    const { container: container2 } = render(<InputError error="Error" />);
    expect(container2.querySelector('span')).not.toBeNull();
    expect(container2.querySelector('span')).toHaveTextContent('Error');
    expect(container2.querySelector('span')).toHaveClass(
      'text-red-500 w-full text-base mt-2'
    );
  });
});
