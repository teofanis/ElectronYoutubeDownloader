import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TextInput } from 'renderer/components';

describe('TextInput Test', () => {
  it('should render', () => {
    expect(render(<TextInput>Test</TextInput>)).toBeTruthy();
  });
});
