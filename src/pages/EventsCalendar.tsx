
import React, { useState, Fragment } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, ArrowLeft, ArrowRight, MapPin, ChevronRight } from 'lucide-react';
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

// Define event categories with colors and events
const eventCategories = [
  {
    id: 'cultural',
    name: {
      th: 'Cultural Escape',
      en: 'Cultural Escape',
      cn: 'Cultural Escape',
      jp: 'Cultural Escape'
    },
    color: 'bg-orange-600',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
    events: [
      {
        id: 'c1',
        name: {
          th: 'งานประเพณีสรงน้ำพระบรมธาตุหริภุญชัย',
          en: 'Bathing Ceremony of Hariphunchai Pagoda',
          cn: '哈里奔猜佛塔浴佛仪式',
          jp: 'ハリプンチャイ仏塔水かけ儀式'
        },
        date: '2025-05-10',
      },
      {
        id: 'c2',
        name: {
          th: 'ประเพณีแห่ผ้าขึ้นธาตุ',
          en: 'Cloth Offering Procession to the Pagoda',
          cn: '佛塔布施仪式',
          jp: '仏塔への布奉納行列'
        },
        date: '2025-07-25',
      },
      {
        id: 'c3',
        name: {
          th: 'งานรำถวายเจดีย์ ณ วัดพระธาตุหริภุญชัย',
          en: 'Traditional Dance Offering at Hariphunchai Temple',
          cn: '在哈里奔猜寺的传统舞蹈祭祀',
          jp: 'ハリプンチャイ寺院での伝統舞踊奉納'
        },
        date: '2025-10-15',
      }
    ]
  },
  {
    id: 'sound',
    name: {
      th: 'Sound of Lamphun',
      en: 'Sound of Lamphun',
      cn: 'Sound of Lamphun',
      jp: 'Sound of Lamphun'
    },
    color: 'bg-teal-500',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
    events: [
      {
        id: 's1',
        name: {
          th: 'คอนเสิร์ตกลางสวนในวัดเก่า',
          en: 'Garden Concert in Ancient Temple',
          cn: '古寺花园音乐会',
          jp: '古代寺院でのガーデンコンサート'
        },
        date: '2025-04-20',
      },
      {
        id: 's2',
        name: {
          th: 'ลานดนตรีเยาวชนลำพูน',
          en: 'Lamphun Youth Music Plaza',
          cn: '南奔青年音乐广场',
          jp: 'ランプーン青少年音楽広場'
        },
        date: '2025-06-15',
      },
      {
        id: 's3',
        name: {
          th: 'งานดนตรีแจ๊สริมแม่น้ำกวง',
          en: 'Jazz by the Kuang River',
          cn: '广河畔爵士音乐',
          jp: 'クアン川沿いジャズフェスティバル'
        },
        date: '2025-12-10',
      }
    ]
  },
  {
    id: 'sports',
    name: {
      th: 'Sports Tourism',
      en: 'Sports Tourism',
      cn: 'Sports Tourism',
      jp: 'Sports Tourism'
    },
    color: 'bg-blue-700',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
    events: [
      {
        id: 'sp1',
        name: {
          th: 'Lamphun Marathon',
          en: 'Lamphun Marathon',
          cn: '南奔马拉松',
          jp: 'ランプーンマラソン'
        },
        date: '2025-03-15',
      },
      {
        id: 'sp2',
        name: {
          th: 'ปั่นจักรยานท่องเที่ยว เมืองเก่าลำพูน',
          en: 'Cycling Tour in Old Lamphun City',
          cn: '南奔古城自行车之旅',
          jp: 'ランプーン旧市街サイクリングツアー'
        },
        date: '2025-08-22',
      },
      {
        id: 'sp3',
        name: {
          th: 'Khun Tan Trail',
          en: 'Khun Tan Trail',
          cn: '昆丹步道',
          jp: 'クンタントレイル'
        },
        date: '2025-11-05',
      },
      {
        id: 'sp4',
        name: {
          th: 'Triathlon',
          en: 'Triathlon',
          cn: '铁人三项',
          jp: 'トライアスロン'
        },
        date: '2025-05-28',
      }
    ]
  },
  {
    id: 'creative',
    name: {
      th: 'Creative Experience',
      en: 'Creative Experience',
      cn: 'Creative Experience',
      jp: 'Creative Experience'
    },
    color: 'bg-cyan-600',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
    events: [
      {
        id: 'ce1',
        name: {
          th: 'เวิร์กชอปผ้ามัดย้อมและผ้าทอ',
          en: 'Tie-Dye and Weaving Workshops',
          cn: '扎染和编织工作坊',
          jp: '絞り染めと織物ワークショップ'
        },
        date: '2025-02-20',
      },
      {
        id: 'ce2',
        name: {
          th: 'Lamphun Craft Week',
          en: 'Lamphun Craft Week',
          cn: '南奔工艺周',
          jp: 'ランプーンクラフトウィーク'
        },
        date: '2025-09-10',
      },
      {
        id: 'ce3',
        name: {
          th: 'นิทรรศการภาพถ่ายวิถีชีวิตชาวลำพูน',
          en: 'Lamphun Lifestyle Photography Exhibition',
          cn: '南奔生活方式摄影展',
          jp: 'ランプーン生活様式写真展'
        },
        date: '2025-04-05',
      }
    ]
  },
  {
    id: 'volunteer',
    name: {
      th: 'Volunteer Adventure',
      en: 'Volunteer Adventure',
      cn: 'Volunteer Adventure',
      jp: 'Volunteer Adventure'
    },
    color: 'bg-green-600',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
    events: [
      {
        id: 'v1',
        name: {
          th: 'อาสาสมัครพัฒนาป่าชุมชน',
          en: 'Community Forest Development Volunteer',
          cn: '社区森林发展志愿者',
          jp: 'コミュニティフォレスト開発ボランティア'
        },
        date: '2025-07-15',
      }
    ]
  },
  {
    id: 'educational',
    name: {
      th: 'Educational Tourism',
      en: 'Educational Tourism',
      cn: 'Educational Tourism',
      jp: 'Educational Tourism'
    },
    color: 'bg-orange-500',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
    events: [
      {
        id: 'e1',
        name: {
          th: 'แข่งขัน robot',
          en: 'Robot Competition',
          cn: '机器人比赛',
          jp: 'ロボットコンペティション'
        },
        date: '2025-06-28',
      },
      {
        id: 'e2',
        name: {
          th: 'แข่งขันหมากกระดาน',
          en: 'Board Game Competition',
          cn: '棋盘游戏比赛',
          jp: 'ボードゲーム競技会'
        },
        date: '2025-08-10',
      }
    ]
  }
];

const EventsCalendar: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter events based on search term and selected category
  const filteredCategories = eventCategories.filter(category => 
    selectedCategory === null || category.id === selectedCategory
  );

  const allEvents = eventCategories.flatMap(category => 
    category.events.map(event => ({
      ...event,
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color
    }))
  );
  
  const filteredEvents = allEvents.filter(event => 
    event.name[language as keyof typeof event.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) &&
    (selectedCategory === null || event.categoryId === selectedCategory)
  );

  // Group events by month for the calendar view
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Fragment>
      <Navbar />
      
      {/* Simplified Hero Section without colorful gradients */}
      <div className="relative pt-20 pb-10 bg-gray-50">
        <div className="container mt-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Tourism Calendar of Lamphun
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Discover upcoming events and festivals in Lamphun throughout the year.
          </p>
          
          {/* Search bar */}
          <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search events..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Grid Layout based on the image */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventCategories.map((category) => (
              <div 
                key={category.id}
                className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              >
                <div className={`absolute inset-0 ${category.color} bg-opacity-80`}></div>
                <img 
                  src={category.image} 
                  alt={category.name[language as keyof typeof category.name]}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <h2 className="text-3xl font-bold mb-4">
                    {category.name[language as keyof typeof category.name]}
                  </h2>
                  <ul className="space-y-2">
                    {category.events.map((event) => (
                      <li key={event.id} className="flex items-center">
                        <span className="text-lg">•</span>
                        <span className="ml-2">{event.name[language as keyof typeof event.name]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {category.id === selectedCategory && (
                  <div className="absolute top-4 right-4 bg-white text-primary p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Events Listing by Selected Category or All Events */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <CalendarIcon className="mr-3 h-7 w-7 text-primary" />
              {selectedCategory 
                ? eventCategories.find(c => c.id === selectedCategory)?.name[language as keyof typeof eventCategories[0].name]
                : 'All Events'
              }
            </h2>
            {selectedCategory && (
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                View All Categories
              </Button>
            )}
          </div>
          
          {sortedEvents.length > 0 ? (
            <div className="space-y-6">
              {sortedEvents.map((event) => {
                const category = eventCategories.find(c => c.id === event.categoryId);
                return (
                  <Link to={`/events/${event.id}`} key={event.id}>
                    <Card className={`overflow-hidden hover:shadow-md transition-all border-l-4 ${event.categoryColor}`}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`${event.categoryColor} p-6 md:w-32 flex flex-col justify-center items-center text-white`}>
                            <span className="text-3xl font-bold">
                              {format(new Date(event.date), 'dd')}
                            </span>
                            <span className="text-sm uppercase">
                              {format(new Date(event.date), 'MMM yyyy')}
                            </span>
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs ${category?.color} ${category?.textColor} mb-2`}>
                                  {category?.name[language as keyof typeof category.name]}
                                </span>
                                <h3 className="text-xl font-semibold">
                                  {event.name[language as keyof typeof event.name]}
                                </h3>
                              </div>
                              <Button
                                variant="ghost"
                                className="mt-3 md:mt-0"
                              >
                                View Details
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
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
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Try adjusting your search term." : "There are no events in this category yet."}
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Calendar Timeline View */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <CalendarIcon className="mr-3 h-7 w-7 text-primary" />
            Events Timeline
          </h2>
          
          <div className="relative overflow-x-auto pb-8">
            <div className="min-w-[1000px]">
              {/* Month headers */}
              <div className="flex border-b mb-4">
                {months.map((month) => (
                  <div key={month} className="flex-1 text-center pb-2 font-semibold">
                    {month}
                  </div>
                ))}
              </div>
              
              {/* Category timelines */}
              {filteredCategories.map((category) => (
                <div key={category.id} className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className={`w-4 h-4 rounded-sm ${category.color} mr-2`}></div>
                    <h3 className="font-semibold">
                      {category.name[language as keyof typeof category.name]}
                    </h3>
                  </div>
                  
                  <div className="relative h-14 bg-gray-50 rounded-lg border">
                    {/* Month grid lines */}
                    <div className="absolute inset-0 grid grid-cols-12 gap-0">
                      {months.map((month, i) => (
                        <div key={i} className="border-r h-full last:border-r-0" />
                      ))}
                    </div>
                    
                    {/* Event markers */}
                    {category.events.map((event) => {
                      const date = new Date(event.date);
                      const month = date.getMonth();
                      const leftPosition = (month / 12) * 100;
                      
                      return (
                        <div
                          key={event.id}
                          className={`absolute ${category.color} text-white px-3 py-1 rounded-md text-xs shadow-md cursor-pointer hover:shadow-lg transition-all`}
                          style={{
                            left: `${leftPosition}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            maxWidth: '150px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={event.name[language as keyof typeof event.name]}
                        >
                          {format(date, 'MMM d')} - {event.name[language as keyof typeof event.name]}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </Fragment>
  );
};

export default EventsCalendar;
