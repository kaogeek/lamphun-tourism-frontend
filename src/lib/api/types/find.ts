export type PopulateValue = boolean | FindParams;
export type PopulateObject = {
  [key: string]: PopulateValue;
};

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  withCount?: boolean;
};

export type FindParams = {
  pagination?: PaginationParams;
  populate?: string[] | PopulateObject;
  fields?: string[];
  filters?: Record<string, any>;
  sort?: string[];
};
