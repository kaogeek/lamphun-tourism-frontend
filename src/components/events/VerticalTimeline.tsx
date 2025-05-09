
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { eventCategories } from '@/data/eventData';

const VerticalTimeline: React.FC = () => {
  const { language } = useLanguage();
  
  // Get upcoming events sorted by date
  const upcomingEvents = eventCategories
    .flatMap(category => 
      category.events.map(event => ({
        ...event,
        categoryId: category.id,
        categoryName: category.name,
        categoryColor: category.color
      }))
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5); // Get only next 5 events

  // Function to get appropriate image for category
  const getCategoryImage = (categoryId: string) => {
    switch(categoryId) {
      case 'cultural':
        return '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png';
      case 'sound':
        return '/lovable-uploads/c5a8cc54-e462-469c-8fca-9c7f191ec2e6.png';
      case 'sports':
        return '/lovable-uploads/trail.jpg';
      default:
        return '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png';
    }
  };

  return (
    <div className="py-6">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 sm:left-24 h-full w-0.5 bg-gradient-to-b from-primary to-secondary"></div>
        
        {/* Timeline content */}
        <div className="space-y-12">
          {upcomingEvents.map((event, index) => {
            const category = eventCategories.find(c => c.id === event.categoryId);
            
            return (
              <div key={event.id} className="relative pl-16 sm:pl-32">
                {/* Timeline dot with date */}
                <div className="absolute left-8 sm:left-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className={`${category?.color || 'bg-primary'} w-16 h-16 rounded-full border-4 border-white shadow flex flex-col items-center justify-center text-white`}>
                    <span className="text-xs font-bold">
                      {format(new Date(event.date), 'MMM')}
                    </span>
                    <span className="text-lg font-bold">
                      {format(new Date(event.date), 'dd')}
                    </span>
                  </div>
                </div>
                
                {/* Event content */}
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-l-primary">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Event image */}
                    <div className="w-full md:w-1/3 h-48 rounded-md overflow-hidden">
                      <img 
                        src={getCategoryImage(event.categoryId)} 
                        alt={event.name[language as keyof typeof event.name]}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${category?.color} ${category?.textColor || 'text-white'}`}>
                          {category && category.name[language as keyof typeof category.name]}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">
                        {event.name[language as keyof typeof event.name]}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>
                          {format(new Date(event.date), 'EEEE, MMMM dd, yyyy')}
                        </span>
                      </div>
                      
                      <Link to={`/events/${event.id}`}>
                        <Button className="mt-2" variant="outline">
                          View Details
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/events">
          <Button>
            View All Events
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerticalTimeline;
