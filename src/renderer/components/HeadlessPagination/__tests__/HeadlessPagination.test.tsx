import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IPaginationProps } from 'interfaces';
import { HeadlessPagination } from 'renderer/components';

const setupPagination = ({
  currentPage = 5,
  setCurrentPage = () => {},
  className = '',
  truncableText = '...',
  truncableClassName = '',
  totalPages = 10,
  edgePageCount = 1,
  middlePagesSiblingCount = 2,
  children = (
    <>
      <HeadlessPagination.PrevButton dataTestId="prev">
        Previous
      </HeadlessPagination.PrevButton>

      <div className="flex items-center justify-center flex-grow">
        <HeadlessPagination.PageButton
          dataTestIdActive="active"
          dataTestIdInactive="inactive"
        />
      </div>

      <HeadlessPagination.NextButton dataTestId="next">
        Next
      </HeadlessPagination.NextButton>
    </>
  ),
}: Partial<IPaginationProps>) =>
  render(
    <HeadlessPagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      className={className}
      truncableText={truncableText}
      truncableClassName={truncableClassName}
      totalPages={totalPages}
      edgePageCount={edgePageCount}
      middlePagesSiblingCount={middlePagesSiblingCount}
    >
      {children}
    </HeadlessPagination>
  );

describe('HeadlessPagination', () => {
  it('renders correctly with basic setup of prevButton, pageButton and nextButton', () => {
    const { asFragment } = setupPagination({});

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with different truncable text', () => {
    const { asFragment } = setupPagination({
      truncableText: '---',
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with advanced setup of prevButton, pageButton and nextButton using Tailwind', () => {
    const { asFragment } = setupPagination({
      className: 'flex items-center w-full h-10 text-sm select-none',
      truncableClassName: 'w-10 px-0.5 text-center',
      children: (
        <>
          <HeadlessPagination.PrevButton className="flex items-center mr-2 text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none">
            Previous
          </HeadlessPagination.PrevButton>

          <div className="flex items-center justify-center flex-grow">
            <HeadlessPagination.PageButton
              activeClassName="bg-primary-50 dark:bg-opacity-0 text-primary-600 dark:text-white"
              inactiveClassName="text-gray-500"
              className="flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"
            />
          </div>

          <HeadlessPagination.NextButton className="flex items-center mr-2 text-gray-500 opacity-50 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none">
            Next
          </HeadlessPagination.NextButton>
        </>
      ),
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('clicking on previous calls mockSetCurrentPage with currentPage - 1', () => {
    const mockSetCurrentPage = jest.fn();

    setupPagination({
      currentPage: 4,
      totalPages: 5,
      setCurrentPage: mockSetCurrentPage,
    });

    expect(screen.getByTestId('active-page-button').textContent).toEqual('5');

    screen.getByTestId('prev').click();

    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('clicking on next calls mockSetCurrentPage with currentPage + 1', () => {
    const mockSetCurrentPage = jest.fn();

    setupPagination({
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: mockSetCurrentPage,
    });

    expect(screen.getByTestId('active-page-button').textContent).toEqual('2');

    screen.getByTestId('next').click();

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('clicking on current page calls mockSetCurrentPage with currentPage', () => {
    const mockSetCurrentPage = jest.fn();

    setupPagination({
      currentPage: 5,
      totalPages: 10,
      setCurrentPage: mockSetCurrentPage,
    });

    expect(screen.getByTestId('active-page-button').textContent).toEqual('6');

    screen.getByTestId('inactive-page-button-10').click();

    expect(mockSetCurrentPage).toHaveBeenCalledWith(9);
  });
});
