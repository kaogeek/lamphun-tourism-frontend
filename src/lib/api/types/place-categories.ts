import { MetaResponseBody } from './meta';

export type PlaceCategory = {
  id: string;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: PlaceCategory[];
};

export type GetPlaceCategoriesResponse = {
  data: PlaceCategory[];
  meta: MetaResponseBody;
};
