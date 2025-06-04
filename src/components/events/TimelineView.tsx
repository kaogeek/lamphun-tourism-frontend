import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { EventCategory } from '@/types/events';
import { useLanguage } from '@/context/LanguageContext';

interface TimelineViewProps {
  categories: EventCategory[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ categories }) => {
  const { language } = useLanguage();

  // Function to get appropriate image for category
  const getCategoryImage = (categoryId: string) => {
    switch (categoryId) {
      case 'cultural':
        return '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png';
      case 'sound':
        return '/lovable-uploads/c5a8cc54-e462-469c-8fca-9c7f191ec2e6.png';
      case 'sports':
        return '/lovable-uploads/74fde137-ebb8-408a-9107-5401e9c6ddf6.png';
      default:
        return '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png';
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <CalendarIcon className="mr-3 h-7 w-7 text-primary" />
          Events Timeline
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

          {/* Timeline content */}
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className={`${category.color} text-white px-4 py-2 rounded-full font-medium`}>
                    {category.name[language as keyof typeof category.name]}
                  </div>
                </div>

                {/* Events in this category */}
                {category.events.map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className={`relative flex items-start ${eventIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} sm:flex-row-reverse mb-12`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className={`${category.color} w-4 h-4 rounded-full border-4 border-white shadow`}></div>
                    </div>

                    {/* Event content */}
                    <div className="sm:w-1/2 pr-8 sm:pr-0 sm:pl-8">
                      <div
                        className={`bg-white rounded-lg shadow-md border-l-4 ${category.color} hover:shadow-lg transition-all p-6`}
                      >
                        {/* Date */}
                        <div className="flex items-center mb-3">
                          <div
                            className={`${category.color} text-white rounded-full w-10 h-10 flex items-center justify-center mr-3`}
                          >
                            <span className="text-xs font-bold">
                              {format(new Date(event.date), 'MMM').substring(0, 3)}
                            </span>
                          </div>
                          <span className="text-lg font-semibold">{format(new Date(event.date), 'dd MMMM yyyy')}</span>
                        </div>

                        {/* Event name */}
                        <h3 className="text-xl font-bold mb-3">{event.name[language as keyof typeof event.name]}</h3>

                        {/* Event image */}
                        <div className="w-full h-40 rounded-md overflow-hidden mb-4">
                          <img
                            src={getCategoryImage(category.id)}
                            alt={event.name[language as keyof typeof event.name]}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Timeline end */}
          <div className="absolute left-8 sm:left-1/2 bottom-0 transform -translate-x-1/2">
            <div className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
