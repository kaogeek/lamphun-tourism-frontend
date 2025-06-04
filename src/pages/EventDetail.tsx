import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { eventCategories } from '@/data/eventData';
import { Event } from '@/types/events';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

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
  const [event, setEvent] = useState<EventWithCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Find the event in all categories
    const foundEvent = eventCategories.reduce<EventWithCategory | null>((result, category) => {
      if (result) return result;

      const found = category.events.find((e) => e.id === id);
      if (found) {
        return {
          ...found,
          categoryId: category.id,
          categoryName: category.name,
          categoryColor: category.color,
        };
      }
      return null;
    }, null);

    setEvent(foundEvent);
    setLoading(false);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event?.name[language as keyof typeof event.name] || '',
          text: event?.description?.[language as keyof typeof event.description] || '',
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if sharing fails
          navigator.clipboard.writeText(window.location.href);
          toast({
            title:
              language === 'th'
                ? 'คัดลอก URL แล้ว'
                : language === 'en'
                  ? 'URL copied to clipboard'
                  : language === 'cn'
                    ? 'URL已复制到剪贴板'
                    : 'URLがクリップボードにコピーされました',
            description:
              language === 'th'
                ? 'ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว'
                : language === 'en'
                  ? 'The link has been copied to your clipboard'
                  : language === 'cn'
                    ? '链接已复制到您的剪贴板'
                    : 'リンクがクリップボードにコピーされました',
          });
        });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title:
          language === 'th'
            ? 'คัดลอก URL แล้ว'
            : language === 'en'
              ? 'URL copied to clipboard'
              : language === 'cn'
                ? 'URL已复制到剪贴板'
                : 'URLがクリップボードにコピーされました',
        description:
          language === 'th'
            ? 'ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว'
            : language === 'en'
              ? 'The link has been copied to your clipboard'
              : language === 'cn'
                ? '链接已复制到您的剪贴板'
                : 'リンクがクリップボードにコピーされました',
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-24 min-h-[60vh] flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-xl font-medium">
              {language === 'th'
                ? 'กำลังโหลด...'
                : language === 'en'
                  ? 'Loading...'
                  : language === 'cn'
                    ? '加载中...'
                    : '読み込み中...'}
            </h3>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="container mt-24 min-h-[60vh] flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'th'
                ? 'ไม่พบกิจกรรม'
                : language === 'en'
                  ? 'Event Not Found'
                  : language === 'cn'
                    ? '未找到活动'
                    : 'イベントが見つかりません'}
            </h2>
            <p className="text-gray-500 mb-6">
              {language === 'th'
                ? 'ไม่พบกิจกรรมที่คุณกำลังมองหา'
                : language === 'en'
                  ? 'The event you are looking for could not be found'
                  : language === 'cn'
                    ? '无法找到您正在寻找的活动'
                    : 'お探しのイベントが見つかりませんでした'}
            </p>
            <Link to="/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'th'
                  ? 'กลับไปยังรายการกิจกรรม'
                  : language === 'en'
                    ? 'Back to Events'
                    : language === 'cn'
                      ? '回到活动列表'
                      : 'イベント一覧に戻る'}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const eventDate = new Date(event.date);

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <div
        className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image || '/lovable-uploads/cultural.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container pb-16 md:pb-20">
            <div className="max-w-3xl">
              <Badge className={`${event.categoryColor} text-white mb-4`}>
                {event.categoryName[language as keyof typeof event.categoryName]}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {event.name[language as keyof typeof event.name]}
              </h1>
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
                {language === 'th'
                  ? 'กลับไปยังรายการกิจกรรม'
                  : language === 'en'
                    ? 'Back to Events'
                    : language === 'cn'
                      ? '回到活动列表'
                      : 'イベント一覧に戻る'}
              </Button>
            </Link>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'th'
                    ? 'รายละเอียดงาน'
                    : language === 'en'
                      ? 'Event Details'
                      : language === 'cn'
                        ? '活动详情'
                        : 'イベント詳細'}
                </h2>

                <div className="prose max-w-none">
                  <p className="text-lg mb-8">
                    {event.description?.[language as keyof typeof event.description] ||
                      (language === 'th'
                        ? 'ไม่มีข้อมูลรายละเอียดเพิ่มเติม'
                        : language === 'en'
                          ? 'No additional information available'
                          : language === 'cn'
                            ? '没有更多信息'
                            : '追加情報はありません')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6 sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-4">
                  {language === 'th'
                    ? 'ข้อมูลสำคัญ'
                    : language === 'en'
                      ? 'Essential Information'
                      : language === 'cn'
                        ? '重要信息'
                        : '重要情報'}
                </h3>

                <div className="flex items-start gap-3 mb-4">
                  <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {language === 'th' ? 'วันที่' : language === 'en' ? 'Date' : language === 'cn' ? '日期' : '日付'}
                    </p>
                    <p className="text-gray-600">{format(eventDate, 'EEEE, d MMMM yyyy')}</p>
                  </div>
                </div>

                {event.time && (
                  <div className="flex items-start gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {language === 'th' ? 'เวลา' : language === 'en' ? 'Time' : language === 'cn' ? '时间' : '時間'}
                      </p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start gap-3 mb-6">
                    <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {language === 'th'
                          ? 'สถานที่'
                          : language === 'en'
                            ? 'Location'
                            : language === 'cn'
                              ? '地点'
                              : '場所'}
                      </p>
                      <p className="text-gray-600">{event.location[language as keyof typeof event.location]}</p>
                    </div>
                  </div>
                )}

                <Separator className="my-4" />

                <Button className="w-full mt-2" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  {language === 'th'
                    ? 'แชร์กิจกรรมนี้'
                    : language === 'en'
                      ? 'Share this event'
                      : language === 'cn'
                        ? '分享此活动'
                        : 'このイベントをシェアする'}
                </Button>
              </CardContent>
            </Card>

            {/* Related events could be added here in future */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventDetail;
