import { EventCategory } from './event-categories';
import { MetaResponseBody } from './meta';
import { Place } from './places';

export type GetEventsResponse = {
  data: Event[];
  meta: MetaResponseBody;
};

export type Event = {
  id: number;
  documentId: string;
  title: string;
  shortDescription: string;
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
