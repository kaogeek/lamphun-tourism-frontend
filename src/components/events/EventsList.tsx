import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { EventCategory, Event } from '@/types/events';
import { useLanguage } from '@/context/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface EventsListProps {
  events: Array<
    Event & {
      categoryId: string;
      categoryColor: string;
    }
  >;
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  categories: EventCategory[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  selectedCategory,
  setSelectedCategory,
  categories,
  searchTerm,
  setSearchTerm,
}) => {
  const { language } = useLanguage();

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <CalendarIcon className="mr-3 h-7 w-7 text-primary" />
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name[language]
              : language === 'th'
                ? 'กิจกรรมทั้งหมด'
                : language === 'en'
                  ? 'All Events'
                  : language === 'cn'
                    ? '所有活动'
                    : 'すべてのイベント'}
          </h2>
          {selectedCategory && (
            <Button variant="outline" onClick={() => setSelectedCategory(null)}>
              {language === 'th'
                ? 'ดูทุกหมวดหมู่'
                : language === 'en'
                  ? 'View All Categories'
                  : language === 'cn'
                    ? '查看所有类别'
                    : 'すべてのカテゴリーを表示'}
            </Button>
          )}
        </div>

        {/* Category filter buttons */}
        {/* <div className="mb-8 overflow-x-auto">
          <ToggleGroup type="single" className="flex flex-wrap gap-2">
            <ToggleGroupItem 
              value="all" 
              onClick={() => setSelectedCategory(null)}
              className={!selectedCategory ? "bg-primary text-primary-foreground" : ""}
            >
              {language === 'th' ? 'ทุกหมวดหมู่' 
                : language === 'en' ? 'All Categories'
                : language === 'cn' ? '所有类别'
                : 'すべてのカテゴリー'}
            </ToggleGroupItem>
            {categories.map((category) => (
              <ToggleGroupItem
                key={category.id}
                value={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? `${category.color} text-white` : ""}
              >
                {category.name[language as keyof typeof category.name]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div> */}

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const category = categories.find((c) => c.id === event.categoryId);
              const eventDate = new Date(event.date);
              return (
                <Link to={`/events/${event.id}`} key={event.id} className="block h-full">
                  <Card className="overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                    <div
                      className={`${category?.color || 'bg-primary'} text-white p-2 flex items-center justify-between`}
                    >
                      <div className="flex items-center">
                        <div className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                          <span className="font-bold">{format(eventDate, 'dd')}</span>
                        </div>
                        <span>{format(eventDate, 'MMM yyyy')}</span>
                      </div>
                      <Badge variant="outline" className="bg-white bg-opacity-20 text-white border-0">
                        {category && category.name[language as keyof typeof category.name]}
                      </Badge>
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold mb-4">{event.name[language as keyof typeof event.name]}</h3>
                      <div className="mt-auto flex justify-end">
                        <Button variant="ghost" size="sm" className="mt-2">
                          {language === 'th'
                            ? 'ดูรายละเอียด'
                            : language === 'en'
                              ? 'View Details'
                              : language === 'cn'
                                ? '查看详情'
                                : '詳細を見る'}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {language === 'th'
                ? 'ไม่พบกิจกรรม'
                : language === 'en'
                  ? 'No events found'
                  : language === 'cn'
                    ? '未找到活动'
                    : 'イベントが見つかりません'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? language === 'th'
                  ? 'ลองปรับคำค้นหาของคุณ'
                  : language === 'en'
                    ? 'Try adjusting your search term.'
                    : language === 'cn'
                      ? '尝试调整您的搜索词'
                      : '検索語を調整してみてください'
                : language === 'th'
                  ? 'ยังไม่มีกิจกรรมในหมวดหมู่นี้'
                  : language === 'en'
                    ? 'There are no events in this category yet.'
                    : language === 'cn'
                      ? '此类别中还没有活动'
                      : 'このカテゴリーにはまだイベントがありません'}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                {language === 'th'
                  ? 'ล้างการค้นหา'
                  : language === 'en'
                    ? 'Clear search'
                    : language === 'cn'
                      ? '清除搜索'
                      : '検索をクリア'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
