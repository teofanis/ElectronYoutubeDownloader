import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Heading } from 'renderer/components';

describe('Heading Test', () => {
  it('should render correctly', () => {
    expect(render(<Heading> Youtube Downloader</Heading>)).toMatchSnapshot();
  });
});
