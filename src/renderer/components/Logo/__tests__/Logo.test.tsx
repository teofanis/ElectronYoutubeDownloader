import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Logo } from 'renderer/components';

describe('Logo Test', () => {
  it('should render correctly', () => {
    const rendered = render(<Logo className="h-[125px]" />);
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
