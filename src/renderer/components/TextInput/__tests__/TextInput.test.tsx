import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { TextInput } from 'renderer/components';

describe('TextInput Test', () => {
  it('should render correctly', () => {
    const { container } = render(<TextInput />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveClass(
      'text-black flex-1 placeholder-gray-800 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-300 focus:border-blueGray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-current ring-offset-2'
    );
  });

  it('should render correctly with error', () => {
    const { container } = render(<TextInput errored />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveClass(
      'text-black flex-1 placeholder-gray-800 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-300 focus:border-blueGray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-current ring-offset-2 border-red-500 right-2 outline-red-600 shadow-outline-red-500'
    );
  });

  it('should render correctly with custom class', () => {
    const { container } = render(<TextInput className="custom-class" />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveClass(
      'text-black flex-1 placeholder-gray-800 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-300 focus:border-blueGray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-current ring-offset-2 custom-class'
    );
  });

  it('should render correctly with custom class and error', () => {
    const { container } = render(
      <TextInput errored className="custom-class" />
    );
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveClass(
      'text-black flex-1 placeholder-gray-800 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-300 focus:border-blueGray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-current ring-offset-2 border-red-500 right-2 outline-red-600 shadow-outline-red-500 custom-class'
    );
  });

  it('should render correctly with custom id', () => {
    const { container } = render(<TextInput id="custom-id" />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveAttribute('id', 'custom-id');
  });

  it('should render correctly with custom name', () => {
    const { container } = render(<TextInput name="custom-name" />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveAttribute(
      'name',
      'custom-name'
    );
  });

  it('should render correctly with custom placeholder', () => {
    const { container } = render(
      <TextInput placeholder="custom-placeholder" />
    );
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'custom-placeholder'
    );
  });

  it('should render correctly with custom value', () => {
    const { container } = render(<TextInput value="custom-value" />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveAttribute(
      'value',
      'custom-value'
    );
  });

  it('should render correctly with custom type (use text)', () => {
    const { container } = render(<TextInput type="password" />);
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('input')).toHaveAttribute('type', 'text');
  });

  it('should handle onChange event', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<TextInput onChange={mockOnChange} />);
    expect(container.querySelector('input')).not.toBeNull();
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toBeCalled();
  });

  it('should handle onBlur event', () => {
    const mockOnBlur = jest.fn();
    const { container } = render(<TextInput onBlur={mockOnBlur} />);
    expect(container.querySelector('input')).not.toBeNull();
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.blur(input);
    expect(mockOnBlur).toBeCalled();
  });
});
