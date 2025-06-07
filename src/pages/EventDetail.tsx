import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
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
import { ArrowLeft, CalendarIcon, Share2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

interface EventWithCategory extends Event {
  categoryId: string;
  categoryName: {
    th: string;
    en: string;
    cn: string;
    jp: string;
  };
  categoryColor: string;
}

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
      localizations: {
        populate: ['eventCategory', 'coverImage'],
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

  const LoadingState = () => {
    return (
      <>
        <div className="container mt-24 min-h-[60vh] flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-xl font-medium">{t('common.loading')}</h3>
          </div>
        </div>
      </>
    );
  };

  const EmptyState = () => {
    return (
      <>
        <div className="container mt-24 min-h-[60vh] flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {/* TODO localized */}
              ไม่พบกิจกรรม
            </h2>
            <p className="text-gray-500 mb-6">
              {/* TODO localized */}
              ไม่พบกิจกรรมที่คุณกำลังมองหา
            </p>
            <Link to="/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {/* TODO localized */}
                กลับไปยังรายการกิจกรรม
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const RenderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return (
        <>
          <p>error</p>
        </>
      );
    }

    const items = data.data;

    if (!items.length) {
      return <EmptyState />;
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
                  {event.eventCategory.name ?? '-'}
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
                  {/* TODO localized */}
                  กลับไปยังรายการกิจกรรม
                </Button>
              </Link>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    {/* TODO localized */}
                    รายละเอียดงาน
                  </h2>

                  <div className="prose max-w-none">
                    <BlocksRenderer content={event.description} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-4">
                    {/* TODO localized */}
                    ข้อมูลสำคัญ
                  </h3>

                  <div className="flex items-start gap-3 mb-4">
                    <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {/* TODO localized */}
                        วันที่
                      </p>
                      {/* <p className="text-gray-600">{format(eventDate, 'EEEE, d MMMM yyyy')}</p> */}
                    </div>
                  </div>

                  {/* {event.time && (
                    <div className="flex items-start gap-3 mb-4">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">เวลา</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>
                  )} */}

                  {/* {event.location && (
                    <div className="flex items-start gap-3 mb-6">
                      <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">สถานที่</p>
                        <p className="text-gray-600">{event.location[language as keyof typeof event.location]}</p>
                      </div>
                    </div>
                  )} */}

                  <Separator className="my-4" />

                  <Button className="w-full mt-2" onClick={() => handleShare(event)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    {/* TODO localized */}
                    แชร์กิจกรรมนี้
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
