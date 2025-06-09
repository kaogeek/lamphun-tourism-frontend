import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { FileUpload } from './entity';
import { EventCategory } from './event-categories';
import { MetaResponseBody } from './meta';
import { Place } from './places';

export type GetEventsResponse = {
  data: Event[];
  meta: MetaResponseBody;
};

export type Event = {
  id: number;
  slug: string;
  documentId: string;
  title: string;
  shortDescription: string;
  description: BlocksContent;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventCategory?: EventCategory;
  coverImage?: FileUpload;
  place?: Place;
  locale: string;
  localizations: Event[];
};
