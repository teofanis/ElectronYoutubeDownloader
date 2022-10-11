import { Paginator } from 'interfaces';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';
import { ArrowIcon } from 'renderer/components';

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
          <ArrowIcon type="left" />
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
          <ArrowIcon type="right" />
        </HeadlessPagination.NextButton>
      </HeadlessPagination>
    </div>
  );
};

export default Pagination;
