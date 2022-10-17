import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DownloadButton } from 'renderer/components';

describe('DownloadButton Test', () => {
  it('should render', () => {
    expect(render(<DownloadButton text="test" />)).toBeTruthy();
  });

  it('should render correctly with class and text', () => {
    const { container } = render(
      <DownloadButton text="test" className="bg-red-500" />
    );
    expect(container).toHaveTextContent('test');
    expect(container.querySelector('button')).toHaveClass(
      'bg-gray-300 hover:bg-gray-100'
    );
  });

  it('can be disabled', () => {
    const { container } = render(<DownloadButton text="test" disabled />);
    expect(container.querySelector('button')).toBeDisabled();
  });

  it('can be clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <DownloadButton text="test" onClick={onClick} />
    );
    expect(container.querySelector('button')).not.toBeDisabled();
    container.querySelector('button')?.click();
    expect(onClick).toBeCalled();
  });

  it('matches snapshot', () => {
    const { container } = render(<DownloadButton text="test" />);
    expect(container).toMatchSnapshot();
  });
});
