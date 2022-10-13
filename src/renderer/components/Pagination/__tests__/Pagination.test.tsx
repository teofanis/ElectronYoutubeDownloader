import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Pagination } from 'renderer/components';

describe('Pagination Test', () => {
  it('should render', () => {
    expect(
      render(
        <Pagination
          currentPage={0}
          pageHandler={jest.fn}
          paginator={{
            page: 1,
            perPage: 3,
            prePage: null,
            nextPage: null,
            total: 0,
            totalPages: 1,
            data: [1, 2],
          }}
        />
      )
    ).toBeTruthy();
  });
});
