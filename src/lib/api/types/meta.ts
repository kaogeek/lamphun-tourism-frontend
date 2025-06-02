export type MetaPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type MetaResponseBody = {
  pagination: MetaPagination;
};