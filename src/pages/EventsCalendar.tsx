import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CategoryGrid from '@/components/events/CategoryGrid';
import EventHero from '@/components/events/EventHero';
import EventsList from '@/components/events/EventsList';
import React, { useState } from 'react';

const EventsCalendar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <React.Fragment>
      <Navbar />

      <EventHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryGrid selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <EventsList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Footer />
    </React.Fragment>
  );
};

export default EventsCalendar;
