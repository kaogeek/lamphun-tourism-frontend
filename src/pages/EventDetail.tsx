import DateRangeDisplay from '@/components/date/DateRangeDisplay';
import TimeRangeDisplay from '@/components/date/TimeRangeDisplay';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import EmptyState from '@/components/state/EmptyState';
import ErrorState from '@/components/state/ErrorState';
import LoadingState from '@/components/state/LoadingState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetEvents } from '@/hooks/api/useGetEvents';
import { useToast } from '@/hooks/use-toast';
import { Event } from '@/lib/api/types/event';
import { resolveUrl } from '@/lib/file-upload';
import { getTranslateWithFallback } from '@/lib/i18n';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { ArrowLeft, CalendarIcon, Clock, MapPinIcon, Share2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { toast } = useToast();

  const { data, isLoading, error } = useGetEvents({
    filters: {
      slug: {
        $eq: id,
      },
    },
    populate: {
      eventCategory: true,
      coverImage: true,
      place: true,
      localizations: {
        populate: ['eventCategory', 'coverImage', 'place'],
      },
    },
  });

  // TODO move to utils function?
  const handleShare = (event: Event) => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: event.shortDescription,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if sharing fails
          navigator.clipboard.writeText(window.location.href);

          toast({
            title: 'คัดลอก URL แล้ว',
            description: 'ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว',
          });
        });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);

      toast({
        title: 'คัดลอก URL แล้ว',
        description: 'ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว',
      });
    }
  };

  const RenderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState />;
    }

    const items = data?.data ?? [];

    if (!items.length) {
      return (
        <EmptyState
          title={t('events.empty.title')}
          msg={t('events.empty.msg')}
          action={
            <Link to="/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('events.buttons.back')}
              </Button>
            </Link>
          }
        />
      );
    }

    const event = getTranslateWithFallback(items[0], language, ['slug']);

    return (
      <>
        <div
          className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${resolveUrl(event.coverImage?.url)})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container pb-16 md:pb-20">
              <div className="max-w-3xl">
                <Badge
                  className={`text-white mb-4`}
                  style={{
                    backgroundColor: event.eventCategory?.color,
                  }}
                >
                  {event.eventCategory?.name ?? 'Unknown'}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{event.title ?? '-'}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Link to="/events">
                <Button variant="outline" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('events.buttons.back')}
                </Button>
              </Link>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">{t('events.description')}</h2>

                  <div className="prose max-w-none">
                    <BlocksRenderer content={event.description} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-4">{t('common.label.importantInfo')}</h3>

                  <div className="flex items-start gap-3 mb-4">
                    <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t('common.label.day')}</p>
                      <p className="text-gray-600">
                        <DateRangeDisplay startDate={event.startDate} endDate={event.endDate} />
                      </p>
                    </div>
                  </div>

                  {event.startTime && event.endTime && (
                    <div className="flex items-start gap-3 mb-4">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{t('common.label.time')}</p>
                        <TimeRangeDisplay startTime={event.startTime} endTime={event.endTime} />
                      </div>
                    </div>
                  )}

                  {/* TODO make to link to google map */}
                  {event.place && (
                    <div className="flex items-start gap-3 mb-6">
                      <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{t('common.label.place')}</p>
                        <p className="text-gray-600">{event.place.name}</p>
                      </div>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <Button className="w-full mt-2" onClick={() => handleShare(event)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    {t('events.buttons.share')}
                  </Button>
                </CardContent>
              </Card>

              {/* Related events could be added here in future */}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mt-24">
        <RenderContent />
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;
