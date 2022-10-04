import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from 'renderer/components';

describe('Button Test', () => {
  it('should render', () => {
    expect(render(<Button>Test</Button>)).toBeTruthy();
  });
});
