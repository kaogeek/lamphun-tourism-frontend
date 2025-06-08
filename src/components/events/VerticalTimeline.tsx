import { Button } from '@/components/ui/button';
import { useGetEvents } from '@/hooks/api/useGetEvents';
import { Event } from '@/lib/api/types/events';
import { resolveUrl } from '@/lib/file-upload';
import { getTranslateWithFallback } from '@/lib/i18n';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EmptyState from '../state/EmptyState';
import ErrorState from '../state/ErrorState';
import { Skeleton } from '../ui/skeleton';

const EventTimelineItem = ({ event }: { event: Event }) => {
  const category = event.eventCategory;

  return (
    <div className="relative pl-16 sm:pl-32">
      {/* Timeline dot with date */}
      <div className="absolute left-8 sm:left-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={`${category?.color || 'bg-primary'} w-16 h-16 rounded-full border-4 border-white shadow flex flex-col items-center justify-center text-white`}
          style={{ backgroundColor: category?.color }}
        >
          <span className="text-xs font-bold">{format(new Date(event.startDate), 'MMM')}</span>
          <span className="text-lg font-bold">{format(new Date(event.startDate), 'dd')}</span>
        </div>
      </div>

      {/* Event content */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-l-primary">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Event image */}
          <div className="w-full md:w-1/3 h-48 rounded-md overflow-hidden">
            <img
              src={resolveUrl(event.coverImage?.url)}
              alt={event.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Event details */}
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <span
                className={`${category?.color || 'bg-primary'} inline-block px-3 py-1 rounded-full text-xs text-white`}
                style={{ backgroundColor: category?.color }}
              >
                {category ? category.name : 'Unknown'}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-3">{event.title}</h3>

            <div className="flex items-center text-gray-600 mb-4">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{format(new Date(event.startDate), 'EEEE, MMMM dd, yyyy')}</span>
            </div>

            <Link to={`/events/${event.slug}`}>
              <Button className="mt-2" variant="outline">
                View Details
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventTimelineItemSkeleton = () => {
  return (
    <div className="relative pl-16 sm:pl-32">
      {/* Timeline dot placeholder */}
      <div className="absolute left-8 sm:left-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-16 h-16 rounded-full border-4 border-white shadow flex flex-col items-center justify-center bg-gray-300" />
      </div>

      {/* Skeleton content card */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-primary">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image skeleton */}
          <div className="w-full md:w-1/3 h-48 rounded-md overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Text skeletons */}
          <div className="flex-1 space-y-3">
            {/* Category badge */}
            <Skeleton className="h-6 w-24 rounded-full" />

            {/* Title */}
            <Skeleton className="h-6 w-3/4" />

            {/* Date */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-32 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

const VerticalTimeline: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { data, isLoading, error } = useGetEvents({
    pagination: {
      pageSize: 5,
    },
    populate: {
      coverImage: true,
      eventCategory: true,
      localizations: {
        populate: {
          coverImage: true,
          eventCategory: true,
        },
      },
    },
    sort: ['startDate'],
  });

  const translatedEvents = data?.data.map((event) => getTranslateWithFallback(event, language, ['slug']));

  return (
    <div className="py-6">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 sm:left-24 h-full w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

        {/* Timeline content */}
        {isLoading ? (
          <div className="space-y-12">
            {Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => (
              <EventTimelineItemSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState />
        ) : translatedEvents && translatedEvents.length === 0 ? (
          <EmptyState title={t('events.empty.title')} msg={t('events.empty.msg')} icon={<CalendarIcon />} />
        ) : (
          <div className="space-y-12">
            {translatedEvents?.map((event) => <EventTimelineItem key={event.documentId} event={event} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalTimeline;
