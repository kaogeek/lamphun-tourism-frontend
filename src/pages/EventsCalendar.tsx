import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventHero from '@/components/events/EventHero';
import CategoryGrid from '@/components/events/CategoryGrid';
import EventsList from '@/components/events/EventsList';
import { eventCategories } from '@/data/eventData';
import { useLanguage } from '@/context/LanguageContext';

const EventsCalendar: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on selected category
  const filteredCategories = eventCategories.filter(
    (category) => selectedCategory === null || category.id === selectedCategory
  );

  // Prepare events with category information
  const allEvents = eventCategories.flatMap((category) =>
    category.events.map((event) => ({
      ...event,
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color,
    }))
  );

  // Filter events based on search term and selected category
  const filteredEvents = allEvents.filter(
    (event) =>
      event.name[language as keyof typeof event.name].toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || event.categoryId === selectedCategory)
  );

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <React.Fragment>
      <Navbar />

      <EventHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryGrid
        categories={eventCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <EventsList
        events={sortedEvents}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={eventCategories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Footer />
    </React.Fragment>
  );
};

export default EventsCalendar;
