import { Paginator } from 'interfaces';

const paginator = <T>(
  items: T[],
  currentPage: number,
  perPageItems: number
): Paginator<T> => {
  const page = currentPage || 1;
  const perPage = perPageItems || 10;
  const offset = (page - 1) * perPage;
  const paginatedItems = items.slice(offset).slice(0, perPageItems);
  const totalPages = Math.ceil(items.length / perPage);

  return {
    page,
    perPage,
    prePage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages,
    data: paginatedItems,
  };
};
export default paginator;
