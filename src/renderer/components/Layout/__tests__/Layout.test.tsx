import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Layout } from 'renderer/components';

describe('Layout Test', () => {
  it('should render correctly', () => {
    const rendered = render(
      <Layout>
        <div> Cool Layout Test</div>
      </Layout>
    );
    expect(rendered).toBeTruthy();
    expect(rendered.container.querySelector('div')?.children.length).toBe(1);
    expect(rendered.container.querySelector('div')).toHaveTextContent(
      'Cool Layout Test'
    );
    expect(rendered).toMatchSnapshot();
  });
});
