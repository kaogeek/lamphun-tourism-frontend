import { MetaResponseBody } from './meta';

export type EventCategory = {
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
  locale: string;
  localizations: EventCategory[];
};

export type GetEventCategoriesResponse = {
  data: EventCategory[];
  meta: MetaResponseBody;
};
