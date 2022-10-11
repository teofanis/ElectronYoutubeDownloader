import { Paginator } from 'interfaces';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';

interface PaginationProps {
  currentPage: number;
  pageHandler: (page: number) => void;
  paginator: Paginator<unknown>;
}

const Pagination = ({
  currentPage,
  pageHandler,
  paginator,
}: PaginationProps) => {
  const { totalPages, prePage, nextPage } = paginator;
  return (
    <div className="w-full flex justify-center pt-10">
      <HeadlessPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={pageHandler}
        className="inline-flex -space-x-px"
      >
        <HeadlessPagination.PrevButton
          className={`
          py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
          ${prePage ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </HeadlessPagination.PrevButton>

        <div className="flex items-center justify-center flex-grow">
          <HeadlessPagination.PageButton
            activeClassName="text-white"
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          />
        </div>
        <HeadlessPagination.NextButton
          className={`py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                    ${
                      nextPage
                        ? 'cursor-pointer'
                        : `cursor-not-allowed opacity-50`
                    }`}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </HeadlessPagination.NextButton>
      </HeadlessPagination>
    </div>
  );
};

export default Pagination;
