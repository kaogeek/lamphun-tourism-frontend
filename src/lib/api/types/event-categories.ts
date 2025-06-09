import { FileUpload } from './entity';
import { MetaResponseBody } from './meta';

export type EventCategory = {
  id: number;
  documentId: string;
  name: string;
  color: string;
  coverImage?: FileUpload;
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
