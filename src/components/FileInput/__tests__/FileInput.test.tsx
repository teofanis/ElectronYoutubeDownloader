import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FileInput } from 'components';

describe('FileInput Test', () => {
  it('should render', () => {
    expect(render(<FileInput label="test">Test</FileInput>)).toBeTruthy();
  });
});
