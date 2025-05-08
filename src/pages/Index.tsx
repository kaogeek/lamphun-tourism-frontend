
import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AttractionsSection from '@/components/AttractionsSection';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    date: '2025-08-15',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: {
      th: 'ประเพณีสรงน้ำพระธาตุหริภุญชัย',
      en: 'Haripunchai Bathing Ceremony',
      cn: '哈里奔猜浴佛仪式',
      jp: 'ハリプンチャイ水掛け祭り'
    },
    date: '2025-05-10',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80',
  }
];

const Index: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Navbar />
      <Hero />
      
      <AttractionsSection />
      
      {/* Events Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">{t('events.title')}</h2>
            <Link to="/events">
              <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
                {t('events.viewCalendar')}
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <Card className="overflow-hidden card-hover">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.name[language as keyof typeof event.name]} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 md:w-2/3">
                      <div className="flex items-center mb-3">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.name[language as keyof typeof event.name]}
                      </h3>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('map.title')}</h2>
              <p className="text-gray-600 mb-6">
                Discover all the amazing places to visit in Lamphun with our interactive map. Find temples, museums, parks, local markets, and more.
              </p>
              <Link to="/map">
                <Button className="bg-primary hover:bg-primary/90">
                  {t('map.explore')}
                  <MapPin className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2 overflow-hidden rounded-lg shadow-lg h-96">
              <Link to="/map">
                <div className="relative h-full w-full">
                  {/* Placeholder for map - will be replaced with interactive map */}
                  <img 
                    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80" 
                    alt="Lamphun Map" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">Interactive Map</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
