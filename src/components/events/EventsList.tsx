import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetEvents } from '@/hooks/api/useGetEvents';
import { Event } from '@/lib/api/types/event';
import { getTranslateWithFallback } from '@/lib/i18n';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EmptyState from '../state/EmptyState';
import ErrorState from '../state/ErrorState';
import { Skeleton } from '../ui/skeleton';

interface EventsListProps {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

const EventsList: React.FC<EventsListProps> = ({ selectedCategory, setSelectedCategory }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { data, isLoading, error } = useGetEvents({
    filters: {
      eventCategory: {
        documentId: {
          $in: selectedCategory,
        },
      },
    },
    populate: {
      eventCategory: true,
      localizations: {
        populate: ['eventCategory'],
      },
    },
    sort: ['startDate'],
  });

  const EventCard = ({ event }: { event: Event }) => {
    const category = event.eventCategory;

    const eventDate = new Date(event.startDate);

    return (
      <Link to={`/events/${event.slug}`} key={event.documentId} className="block h-full">
        <Card className="overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
          <div
            className={`${category?.color == null ? 'bg-primary' : ''} text-white p-2 flex items-center justify-between`}
            style={{
              backgroundColor: category?.color,
            }}
          >
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                <span className="font-bold">{format(eventDate, 'dd')}</span>
              </div>
              <span>{format(eventDate, 'MMM yyyy')}</span>
            </div>
            <Badge variant="outline" className="bg-white bg-opacity-20 text-white border-0">
              {category ? category.name : 'Unknown'}
            </Badge>
          </div>
          <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
            <div className="mt-auto flex justify-end">
              <Button variant="ghost" size="sm" className="mt-2">
                {t('common.buttons.viewDetail')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  const EventCardSkeleton = () => {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
        <div className="bg-gray-300 text-white p-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center mr-2">
              <Skeleton className="w-6 h-4" />
            </div>
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full bg-white bg-opacity-20" />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <div className="mt-auto flex justify-end">
            <Skeleton className="h-8 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const RenderContent = () => {
    if (isLoading) {
      const randomCount = Math.floor(Math.random() * 6) + 1;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: randomCount }, (_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <ErrorState />;
    }

    const items = data?.data;

    if (!items.length) {
      return (
        <EmptyState title={t('events.empty.title')} msg={t('events.empty.msgCategorySelect')} icon={<CalendarIcon />} />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items
          .map((event) => {
            return getTranslateWithFallback(event, language, ['slug']);
          })
          .map((event) => {
            return (
              <React.Fragment key={event.documentId}>
                <EventCard event={event} />
              </React.Fragment>
            );
          })}
      </div>
    );
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <CalendarIcon className="mr-3 h-7 w-7 text-primary" />
            {t('events.allEvents')}
          </h2>
          {selectedCategory && (
            <Button variant="outline" onClick={() => setSelectedCategory(null)}>
              {t('common.buttons.viewAllCategory')}
            </Button>
          )}
        </div>

        <RenderContent />
      </div>
    </div>
  );
};

export default EventsList;
