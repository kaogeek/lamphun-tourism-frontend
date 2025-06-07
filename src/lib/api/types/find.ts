export type PopulateValue = boolean | FindParams;
export type PopulateObject = {
  [key: string]: PopulateValue;
};

export type FindParams = {
  page?: number;
  limit?: number;
  search?: string;
  populate?: string[] | PopulateObject;
  fields?: string[];
  filters?: Record<string, any>;
  sort?: string[];
};
