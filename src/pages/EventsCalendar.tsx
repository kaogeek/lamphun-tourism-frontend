import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';

const events = [
  {
    id: 1,
    name: {
      th: 'เทศกาลลำไย',
      en: 'Longan Festival',
      cn: '龙眼节',
      jp: 'ロンガンフェスティバル'
    },
    description: {
      th: 'เทศกาลประจำปีที่เฉลิมฉลองผลผลิตลำไย ผลไม้ขึ้นชื่อของลำพูน',
      en: 'Annual festival celebrating longan fruit, a famous product of Lamphun',
      cn: '年度节日，庆祝南奔著名的龙眼水果丰收',
      jp: 'ランプーン名物のロンガンフルーツを祝う年次祭り'
    },
    date: '2025-08-15',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80',
    location: {
      th: 'สนามกีฬากลางจังหวัดลำพูน',
      en: 'Lamphun Central Stadium',
      cn: '南奔中央体育场',
      jp: 'ランプーン中央スタジアム'
    }
  },
  {
    id: 2,
    name: {
      th: 'ประเพณีสรงน้ำพระธาตุหริภุญชัย',
      en: 'Haripunchai Bathing Ceremony',
      cn: '哈里奔猜浴佛仪式',
      jp: 'ハリプンチャイ水掛け祭り'
    },
    description: {
      th: 'พิธีสรงน้ำพระธาตุหริภุญชัย เพื่อความเป็นสิริมงคล',
      en: 'Sacred bathing ceremony of the Haripunchai Pagoda for good fortune',
      cn: '哈里奔猜佛塔的神圣浴佛仪式，祈求好运',
      jp: 'ハリプンチャイ仏塔の神聖な水掛け儀式で幸運を祈願'
    },
    date: '2025-05-10',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80',
    location: {
      th: 'วัดพระธาตุหริภุญชัย',
      en: 'Wat Phra That Hariphunchai',
      cn: '哈里奔猜佛寺',
      jp: 'ワット・プラタート・ハリプンチャイ'
    }
  },
  {
    id: 3,
    name: {
      th: 'งานกาชาดและงานฤดูหนาวลำพูน',
      en: 'Lamphun Red Cross and Winter Fair',
      cn: '南奔红十字会与冬季嘉年华',
      jp: 'ランプーン赤十字と冬のフェア'
    },
    description: {
      th: 'งานออกร้านการกุศล นิทรรศการ และการแสดงศิลปวัฒนธรรมพื้นบ้าน',
      en: 'Charity fair, exhibitions, and cultural performances',
      cn: '慈善博览会、展览和文化表演',
      jp: 'チャリティーフェア、展示会、文化的パフォーマンス'
    },
    date: '2025-12-05',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80',
    location: {
      th: 'ศูนย์ประชุมจังหวัดลำพูน',
      en: 'Lamphun Convention Center',
      cn: '南奔会议中心',
      jp: 'ランプーンコンベンションセンター'
    }
  },
  {
    id: 4,
    name: {
      th: 'ประเพณีสรงน้ำพระพุทธรูประเจ้าตนหลวง',
      en: 'Phra Chao Ton Luang Bathing Ceremony',
      cn: '帕乔顿隆浴佛仪式',
      jp: 'プラ・チャオ・トン・ルアン水掛け祭り'
    },
    description: {
      th: 'พิธีทางศาสนาเพื่อสรงน้ำพระพุทธรูปเก่าแก่ของลำพูน',
      en: 'Religious ceremony for bathing the ancient Buddha image of Lamphun',
      cn: '为南奔古佛像沐浴的宗教仪式',
      jp: 'ランプーンの古代仏像に水をかける宗教的儀式'
    },
    date: '2025-04-15',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80',
    location: {
      th: 'วัดพระเจ้าตนหลวง',
      en: 'Wat Phra Chao Ton Luang',
      cn: '帕乔顿隆寺',
      jp: 'ワット・プラ・チャオ・トン・ルアン'
    }
  },
  {
    id: 5,
    name: {
      th: 'เทศกาลอาหารพื้นเมืองลำพูน',
      en: 'Lamphun Local Food Festival',
      cn: '南奔当地美食节',
      jp: 'ランプーン郷土料理フェスティバル'
    },
    description: {
      th: 'งานแสดงและจำหน่ายอาหารพื้นเมืองของลำพูน',
      en: 'Showcase and sale of Lamphun local cuisine',
      cn: '南奔当地美食的展示和销售',
      jp: 'ランプーン地元料理のショーケースと販売'
    },
    date: '2025-07-20',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80',
    location: {
      th: 'ศูนย์วัฒนธรรมลำพูน',
      en: 'Lamphun Cultural Center',
      cn: '南奔文化中心',
      jp: 'ランプーン文化センター'
    }
  }
];

// Months in multiple languages
const months = {
  th: [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  cn: [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ],
  jp: [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ]
};

const EventsCalendar: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name[language as keyof typeof event.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesDate = date 
      ? new Date(event.date).toDateString() === date.toDateString()
      : true;
    
    return matchesSearch && matchesDate;
  });

  const eventsByMonth = events.reduce((acc: Record<string, typeof events>, event) => {
    const month = new Date(event.date).getMonth();
    const monthKey = months[language as keyof typeof months][month];
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    
    acc[monthKey].push(event);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-10 bg-primary/5">
        <div className="container mt-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('nav.events')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Discover upcoming events and festivals in Lamphun throughout the year.
          </p>
          
          {/* Search and Date picker */}
          <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="rounded-md pointer-events-auto border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendar View */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">
            {date 
              ? `Events on ${format(date, 'MMMM d, yyyy')}`
              : 'All Events'
            }
            {searchTerm && ` matching "${searchTerm}"`}
          </h2>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Link to={`/events/${event.id}`} key={event.id}>
                  <Card className="overflow-hidden h-full card-hover">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.name[language as keyof typeof event.name]} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <CalendarIcon className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm text-gray-600">
                          {format(new Date(event.date), 'MMMM d, yyyy')}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.name[language as keyof typeof event.name]}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {event.description[language as keyof typeof event.description]}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location[language as keyof typeof event.location]}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No events found for the selected criteria.</p>
              <Button 
                variant="link" 
                className="mt-2 text-primary"
                onClick={() => {
                  setDate(undefined);
                  setSearchTerm('');
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
          
          {/* Yearly Calendar */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Events Calendar</h2>
            
            <div className="space-y-12">
              {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
                <div key={month}>
                  <h3 className="text-2xl font-medium mb-6 border-b pb-2">{month}</h3>
                  <div className="space-y-4">
                    {monthEvents.map((event) => (
                      <Link to={`/events/${event.id}`} key={event.id}>
                        <Card className="hover:bg-gray-50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center">
                              <div className="md:w-32 font-medium">
                                {format(new Date(event.date), 'MMM d, yyyy')}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-lg">
                                  {event.name[language as keyof typeof event.name]}
                                </h4>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location[language as keyof typeof event.location]}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default EventsCalendar;
