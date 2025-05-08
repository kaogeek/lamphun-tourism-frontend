
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { EventCategory, Event } from '@/types/events';
import { useLanguage } from '@/context/LanguageContext';

interface EventsListProps {
  events: Array<Event & { 
    categoryId: string; 
    categoryColor: string;
  }>;
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  categories: EventCategory[];
  searchTerm: string;
}

const EventsList: React.FC<EventsListProps> = ({ 
  events, 
  selectedCategory, 
  setSelectedCategory, 
  categories,
  searchTerm
}) => {
  const { language } = useLanguage();
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <CalendarIcon className="mr-3 h-7 w-7 text-primary" />
            {selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.name[language as keyof typeof categories[0].name]
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
        
        {events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event) => {
              const category = categories.find(c => c.id === event.categoryId);
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
  );
};

export default EventsList;
