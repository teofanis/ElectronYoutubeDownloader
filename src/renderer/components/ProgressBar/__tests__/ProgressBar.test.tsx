import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProgressBar } from 'renderer/components';

describe('ProgressBar Test', () => {
  it('should render correctly', () => {
    expect(render(<ProgressBar progress={0} />)).toMatchSnapshot();
  });

  it('should render correctly with text & percentage', () => {
    expect(render(<ProgressBar progress={50} text="text" />)).toMatchSnapshot();
  });

  it('should render correctly with hidePercentage', () => {
    expect(
      render(<ProgressBar progress={0} hidePercentage />)
    ).toMatchSnapshot();
  });

  it('should render correctly with text and hidePercentage', () => {
    expect(
      render(<ProgressBar progress={0} text="text" hidePercentage />)
    ).toMatchSnapshot();
  });
});
