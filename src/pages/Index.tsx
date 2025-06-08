import AttractionsSection from '@/components/AttractionsSection';
import EventsTimeline from '@/components/EventsTimeline';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PopularAttractionsMap from '@/components/PopularAttractionMap';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Hero />

      <AttractionsSection />

      {/* Events Timeline Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('events.title')}</h2>
            <Link to="/events">
              <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
                {t('events.viewCalendar')}
              </Button>
            </Link>
          </div>

          <EventsTimeline />
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('map.title')}</h2>
              <p className="text-gray-600 mb-6">
                Discover all the amazing places to visit in Lamphun with our interactive map. Find temples, museums,
                parks, local markets, and more.
              </p>
              <Link to="/map">
                <Button className="bg-primary hover:bg-primary/90">
                  {t('map.explore')}
                  <MapPin className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2 overflow-hidden rounded-lg shadow-lg h-96">
              <PopularAttractionsMap />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
