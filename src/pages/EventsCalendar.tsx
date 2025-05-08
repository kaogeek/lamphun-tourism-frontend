
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { eventCategories } from '@/data/eventCategories';
import HeroSection from '@/components/events/HeroSection';
import CategoryGrid from '@/components/events/CategoryGrid';
import EventsList from '@/components/events/EventsList';
import TimelineView from '@/components/events/TimelineView';

const EventsCalendar: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on selected category
  const filteredCategories = eventCategories.filter(category => 
    selectedCategory === null || category.id === selectedCategory
  );

  // Create a flat list of all events with category information
  const allEvents = eventCategories.flatMap(category => 
    category.events.map(event => ({
      ...event,
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color
    }))
  );
  
  // Filter events based on search term and selected category
  const filteredEvents = allEvents.filter(event => 
    event.name[language as keyof typeof event.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) &&
    (selectedCategory === null || event.categoryId === selectedCategory)
  );

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Handler functions
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <Navbar />
      
      <HeroSection 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <CategoryGrid 
        categories={eventCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <EventsList 
        events={sortedEvents}
        selectedCategory={selectedCategory}
        onClearCategory={handleClearCategory}
        categories={eventCategories}
        searchTerm={searchTerm}
        onClearSearch={handleClearSearch}
      />
      
      <TimelineView 
        categories={eventCategories}
        filteredCategories={filteredCategories}
      />
      
      <Footer />
    </>
  );
};

export default EventsCalendar;
