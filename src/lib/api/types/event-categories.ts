import { MetaResponseBody } from './meta';

export interface EventCategory {
  id: number;
  documentId: string;
  name: string;
  color: string;
  coverImage?: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type GetEventCategoriesResponse = {
  data: EventCategory[];
  meta: MetaResponseBody;
};
