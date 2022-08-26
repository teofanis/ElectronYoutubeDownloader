import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { InputError } from 'components';

describe('InputError Test', () => {
  it('should render', () => {
    expect(render(<InputError>Test</InputError>)).toBeTruthy();
  });
});
