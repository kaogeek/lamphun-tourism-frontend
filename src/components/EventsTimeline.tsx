
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { format, parse } from 'date-fns';
import { Link } from 'react-router-dom';

// Sample events data with categories and images
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
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80'
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
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80'
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
        image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80'
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
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80'
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
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80'
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
    image: string;
  };
  color: string;
  language: string;
  onClick: () => void;
}

const EventBar: React.FC<EventProps> = ({ event, color, language, onClick }) => {
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
      className={`absolute h-16 rounded-md ${color} bg-opacity-80 text-white text-xs flex items-center justify-start px-3 truncate shadow-md cursor-pointer hover:bg-opacity-100 hover:shadow-lg transition-all duration-300 group overflow-hidden`}
      style={{
        left: `${startPercentage}%`,
        width: `${width}%`,
        minWidth: '80px'
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      <div className="w-10 h-10 rounded-full overflow-hidden mr-2 flex-shrink-0 z-10">
        <img src={event.image} alt={event.name[language]} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col z-10">
        <span className="font-medium whitespace-nowrap">{event.name[language as keyof typeof event.name]}</span>
        <span className="text-xs opacity-80">{format(startDate, 'MMM d')}{startDate.toDateString() !== endDate.toDateString() && ` - ${format(endDate, 'MMM d')}`}</span>
      </div>
      <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const EventsTimeline: React.FC = () => {
  const { language } = useLanguage();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };
  
  return (
    <div className="w-full">
      <Card className="border shadow-lg overflow-hidden">
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
              <Button size="sm" variant="outline" onClick={() => setCurrentYear(prev => prev - 1)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {currentYear - 1}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setCurrentYear(prev => prev + 1)}>
                {currentYear + 1}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* Months timeline with gradient background */}
          <div className="relative h-14 mb-8 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10"></div>
            <div className="absolute inset-0 flex">
              {months.map((month, index) => (
                <div 
                  key={month} 
                  className="flex-1 flex justify-center items-center border-r last:border-r-0 border-gray-200/50" 
                >
                  <span className="text-sm font-medium">{month}</span>
                </div>
              ))}
            </div>
            {/* Today marker */}
            <div className="absolute h-full w-0.5 bg-red-500 left-1/3 z-10">
              <div className="w-3 h-3 bg-red-500 rounded-full absolute top-full left-1/2 transform -translate-x-1/2 mt-1"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 text-xs font-medium whitespace-nowrap">Today</div>
            </div>
          </div>
          
          {/* Event categories */}
          <div className="space-y-8">
            {eventCategories.map((category) => (
              <div key={category.id} className="relative">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 rounded-sm ${category.color} mr-2`}></div>
                  <h3 className="font-semibold">
                    {category.name[language as keyof typeof category.name]}
                  </h3>
                </div>
                <div className="relative h-16 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  {/* Timeline vertical lines */}
                  <div className="absolute inset-0 flex">
                    {months.map((_, i) => (
                      <div key={i} className="flex-1 border-r last:border-r-0 border-gray-200/60" />
                    ))}
                  </div>
                  
                  {category.events.map((event) => (
                    <EventBar 
                      key={event.id} 
                      event={event} 
                      color={category.color}
                      language={language}
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Event detail card when selected */}
          {selectedEvent && (
            <div className="mt-8 bg-white rounded-lg border shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.name[language]} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {selectedEvent.name[language as keyof typeof selectedEvent.name]}
                  </h3>
                  <div className="flex items-center mb-4">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600">
                      {format(new Date(selectedEvent.startDate), 'MMMM d, yyyy')}
                      {selectedEvent.startDate !== selectedEvent.endDate && 
                        ` - ${format(new Date(selectedEvent.endDate), 'MMMM d, yyyy')}`
                      }
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {/* Event description would go here */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
                    euismod, nisi nisl consectetur nisl.
                  </p>
                  <div className="flex justify-end">
                    <Link to={`/events/${selectedEvent.id}`}>
                      <Button>
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="absolute top-3 right-3" 
                onClick={() => setSelectedEvent(null)}
                size="sm"
              >
                ✕
              </Button>
            </div>
          )}
          
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
