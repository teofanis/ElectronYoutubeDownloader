import { Paginator } from 'interfaces';
import { useEffect } from 'react';
import { ArrowIcon, HeadlessPagination } from 'renderer/components';

interface PaginationProps {
  currentPage: number;
  pageHandler: (page: number) => void;
  paginator: Paginator<unknown>;
  show?: boolean;
}

const Pagination = ({
  currentPage,
  pageHandler,
  paginator,
  show,
}: PaginationProps) => {
  const { totalPages, prePage, nextPage, total, page } = paginator;
  useEffect(() => {
    if (page > totalPages) {
      pageHandler(page - 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);
  if (!show) return null;
  return (
    <HeadlessPagination
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={pageHandler}
      truncableText="..."
      truncableClassName="w-10 px-0.5"
      className="inline-flex -space-x-px"
      edgePageCount={2}
      middlePagesSiblingCount={1}
    >
      <HeadlessPagination.PrevButton
        className={`
          py-2 px-3 ml-0 leading-tight
          rounded-l-lg border
           bg-primary-black border-gray-700
           text-gray-400 hover:bg-gray-700 hover:text-white
          ${prePage ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
      >
        <ArrowIcon type="left" />
      </HeadlessPagination.PrevButton>

      <div className="flex items-center justify-center flex-grow">
        <HeadlessPagination.PageButton
          activeClassName="text-white"
          inactiveClassName="text-gray-400"
          className="py-2 px-3 leading-tight border cursor-pointer
          bg-primary-black border-gray-700  hover:bg-gray-700 hover:text-white"
        />
      </div>
      <HeadlessPagination.NextButton
        className={`
         py-2 px-3 ml-0 leading-tight
          rounded-r-lg border
           bg-primary-black border-gray-700
           text-gray-400 hover:bg-gray-700 hover:text-white
                    ${
                      nextPage
                        ? 'cursor-pointer'
                        : `cursor-not-allowed opacity-40`
                    }`}
      >
        <ArrowIcon type="right" />
      </HeadlessPagination.NextButton>
    </HeadlessPagination>
  );
};

Pagination.defaultProps = {
  show: true,
};
export default Pagination;
