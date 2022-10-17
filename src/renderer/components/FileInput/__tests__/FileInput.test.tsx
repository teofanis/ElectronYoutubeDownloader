import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FileInput } from 'renderer/components';

const containerClasses = `text-black flex-1
              placeholder-gray-800
              mt-2
              text-base transition duration-500 ease-in-out transform border-transparent rounded-lg
              focus:border-blueGray-500
              bg-gray-300
              focus:bg-gray-100
              focus:outline-none
              focus:shadow-outline
              focus:ring-2
            ring-gray-700
              ring-offset-current ring-offset-2`;

const buttonClasses = `bg-gray-400
          hover:bg-gray-300
          py-2.5
          rounded-lg px-4 z-10
          text-base
        text-black
          border
          border-blueGray-500
          font-semibold`;

describe('FileInput Test', () => {
  it('should render correctly', () => {
    const rendered = render(
      <FileInput label="Choose a file" onClick={jest.fn} />
    );
    expect(rendered).toMatchSnapshot();
    const { container } = rendered;
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('button')).not.toBeNull();
    expect(container.querySelector('input')).not.toBeNull();

    expect(container.querySelector('button')).toHaveClass(buttonClasses);

    expect(container.querySelector('div')).toHaveClass(containerClasses);

    expect(container.querySelector('input')).toHaveAttribute('type', 'hidden');
    expect(container.querySelector('input')).toHaveAttribute(
      'style',
      'display: none;'
    );
  });

  it('should render correctly with errored', () => {
    const rendered = render(
      <FileInput label="Choose a file" onClick={jest.fn} errored />
    );
    expect(rendered).toMatchSnapshot();
    const { container } = rendered;
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('button')).not.toBeNull();
    expect(container.querySelector('input')).not.toBeNull();

    expect(container.querySelector('button')).toHaveClass(buttonClasses);

    expect(container.querySelector('div')).toHaveClass(
      `${containerClasses} border-red-500 right-2 outline-red-600 shadow-outline-red-500`
    );

    expect(container.querySelector('input')).toHaveAttribute('type', 'hidden');
    expect(container.querySelector('input')).toHaveAttribute(
      'style',
      'display: none;'
    );
  });

  it('should render correctly with value', () => {
    const rendered = render(
      <FileInput label="Choose a file" onClick={jest.fn} value="test" />
    );
    expect(rendered).toMatchSnapshot();
    const { container } = rendered;
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('button')).not.toBeNull();
    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('span')).not.toBeNull();

    expect(container.querySelector('button')).toHaveClass(buttonClasses);

    expect(container.querySelector('div')).toHaveClass(containerClasses);

    expect(container.querySelector('input')).toHaveAttribute('value', 'test');
    expect(container.querySelector('input')).toHaveAttribute('type', 'hidden');
    expect(container.querySelector('input')).toHaveAttribute(
      'style',
      'display: none;'
    );
  });

  it('should render correctly with className', () => {
    const rendered = render(
      <FileInput
        label="Choose a file"
        onClick={jest.fn}
        className="test-class"
      />
    );
    expect(rendered).toMatchSnapshot();
    const { container } = rendered;
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('button')).not.toBeNull();
    expect(container.querySelector('input')).not.toBeNull();

    expect(container.querySelector('button')).toHaveClass(buttonClasses);

    expect(container.querySelector('div')).toHaveClass(
      `${containerClasses} test-class`
    );

    expect(container.querySelector('input')).toHaveAttribute('type', 'hidden');
    expect(container.querySelector('input')).toHaveAttribute(
      'style',
      'display: none;'
    );
  });

  it('should handle click', () => {
    const onClick = jest.fn();
    const rendered = render(
      <FileInput label="Choose a file" onClick={onClick} />
    );
    expect(rendered).toMatchSnapshot();
    const { container } = rendered;
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('button')).not.toBeNull();
    expect(container.querySelector('input')).not.toBeNull();

    expect(container.querySelector('button')).toHaveClass(buttonClasses);

    expect(container.querySelector('div')).toHaveClass(containerClasses);

    expect(container.querySelector('input')).toHaveAttribute('type', 'hidden');
    expect(container.querySelector('input')).toHaveAttribute(
      'style',
      'display: none;'
    );

    container.querySelector('button')?.click();
    expect(onClick).toBeCalled();
  });
});
