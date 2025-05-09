
import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AttractionsSection from '@/components/AttractionsSection';
import EventsTimeline from '@/components/EventsTimeline';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <Hero />
      
      <AttractionsSection />
      
      {/* Events Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{t('events.title')}</h2>
            <Link to="/events">
              <Button variant="outline" className="text-primary hover:text-primary/80 font-medium">
                {t('events.viewCalendar')}
              </Button>
            </Link>
          </div>
          
          <EventsTimeline />
        </div>
      </section>
      
      {/* Map Preview Section */}
      <section className="py-16 bg-white">
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
                    src="/lovable-uploads/map.png" 
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
