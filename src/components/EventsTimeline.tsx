
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

// Sample events data with categories
const eventCategories = [
  {
    id: 'festivals',
    name: {
      th: 'เทศกาล',
      en: 'Festivals',
      cn: '节日',
      jp: '祭り'
    },
    color: 'bg-primary',
    events: [
      {
        id: 1,
        name: {
          th: 'เทศกาลลำไย',
          en: 'Longan Festival',
          cn: '龙眼节',
          jp: 'ロンガンフェスティバル'
        },
        startDate: '2025-08-01',
        endDate: '2025-08-15',
      },
      {
        id: 2,
        name: {
          th: 'เทศกาลโคมลำพูน',
          en: 'Lamphun Lantern Festival',
          cn: '南奔灯节',
          jp: 'ランプーンランタンフェスティバル'
        },
        startDate: '2025-11-10',
        endDate: '2025-11-20',
      }
    ]
  },
  {
    id: 'cultural',
    name: {
      th: 'วัฒนธรรม',
      en: 'Cultural',
      cn: '文化',
      jp: '文化'
    },
    color: 'bg-secondary',
    events: [
      {
        id: 3,
        name: {
          th: 'ประเพณีสรงน้ำพระธาตุหริภุญชัย',
          en: 'Haripunchai Bathing Ceremony',
          cn: '哈里奔猜浴佛仪式',
          jp: 'ハリプンチャイ水掛け祭り'
        },
        startDate: '2025-05-10',
        endDate: '2025-05-10',
      }
    ]
  },
  {
    id: 'workshops',
    name: {
      th: 'เวิร์คช็อป',
      en: 'Workshops',
      cn: '工作坊',
      jp: 'ワークショップ'
    },
    color: 'bg-purple-500',
    events: [
      {
        id: 4,
        name: {
          th: 'เวิร์คช็อปผ้าทอลำพูน',
          en: 'Lamphun Textile Workshop',
          cn: '南奔纺织工作坊',
          jp: 'ランプーン織物ワークショップ'
        },
        startDate: '2025-07-05',
        endDate: '2025-07-20',
      }
    ]
  },
  {
    id: 'exhibitions',
    name: {
      th: 'นิทรรศการ',
      en: 'Exhibitions',
      cn: '展览',
      jp: '展示会'
    },
    color: 'bg-green-500',
    events: [
      {
        id: 5,
        name: {
          th: 'นิทรรศการประวัติศาสตร์ลำพูน',
          en: 'Lamphun History Exhibition',
          cn: '南奔历史展',
          jp: 'ランプーン歴史展'
        },
        startDate: '2025-09-01',
        endDate: '2025-09-30',
      }
    ]
  }
];

// Array of months for the timeline
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

interface EventProps {
  event: {
    id: number;
    name: {
      [key: string]: string;
    };
    startDate: string;
    endDate: string;
  };
  color: string;
  language: string;
}

const EventBar: React.FC<EventProps> = ({ event, color, language }) => {
  // Calculate position and width based on date
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  
  // Calculate width as percentage of the year
  const startPercentage = (startMonth / 12) * 100;
  const endPercentage = ((endMonth + 1) / 12) * 100;
  const width = endPercentage - startPercentage;
  
  return (
    <div 
      className={`absolute h-8 rounded-md ${color} text-white text-xs flex items-center justify-center px-2 truncate shadow-md`}
      style={{
        left: `${startPercentage}%`,
        width: `${width}%`,
        minWidth: '50px'
      }}
    >
      {event.name[language as keyof typeof event.name]}
    </div>
  );
};

const EventsTimeline: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="w-full overflow-x-auto">
      <Card className="border shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary" />
              <span>
                {language === 'th' ? 'ปฏิทินกิจกรรม' : 
                 language === 'cn' ? '活动日历' : 
                 language === 'jp' ? 'イベントカレンダー' : 
                 'Events Timeline'}
              </span>
              <span className="ml-2 text-gray-500">{currentYear}</span>
            </h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {currentYear - 1}
              </Button>
              <Button size="sm" variant="outline">
                {currentYear + 1}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* Months timeline */}
          <div className="relative h-12 mb-8 bg-gray-100 rounded-full">
            <div className="absolute inset-0 flex">
              {months.map((month, index) => (
                <div 
                  key={month} 
                  className="flex-1 flex justify-center items-center border-r last:border-r-0 border-gray-200" 
                  style={{backgroundColor: index % 2 === 0 ? 'rgba(0,172,255,0.1)' : 'rgba(249,115,22,0.1)'}}
                >
                  <span className="text-xs font-medium">{month}</span>
                </div>
              ))}
            </div>
            <div className="absolute h-6 w-1 bg-red-500 top-full left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
              <span className="text-xs font-medium">Today</span>
            </div>
          </div>
          
          {/* Event categories */}
          <div className="space-y-8">
            {eventCategories.map((category) => (
              <div key={category.id} className="relative">
                <div className="flex items-center mb-2">
                  <div className={`w-4 h-4 rounded-sm ${category.color} mr-2`}></div>
                  <h3 className="font-semibold">
                    {category.name[language as keyof typeof category.name]}
                  </h3>
                </div>
                <div className="relative h-12 bg-gray-50 rounded-lg border border-gray-200">
                  {category.events.map((event) => (
                    <EventBar 
                      key={event.id} 
                      event={event} 
                      color={category.color}
                      language={language}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-8 flex gap-4 flex-wrap">
            {eventCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <div className={`w-3 h-3 rounded-sm ${category.color} mr-1.5`}></div>
                <span className="text-xs text-gray-600">
                  {category.name[language as keyof typeof category.name]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsTimeline;
