export type Paginator<T> = {
  page: number;
  perPage: number;
  prePage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
  data: T[];
};
