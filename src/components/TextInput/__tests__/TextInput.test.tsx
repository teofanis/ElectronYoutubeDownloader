import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TextInput } from 'components';

describe('TextInput Test', () => {
  it('should render', () => {
    expect(render(<TextInput>Test</TextInput>)).toBeTruthy();
  });
});
