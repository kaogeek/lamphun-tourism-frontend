import { EventCategory } from './event-categories';
import { MetaResponseBody } from './meta';
import { Place } from './places';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

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
  eventCategory?: EventCategory;
  coverImage?: {
    url: string;
  };
  place?: Place;
  locale: string;
  localizations: Event[];
};
