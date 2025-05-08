
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { EventCategory } from '@/data/eventCategories';

interface TimelineViewProps {
  categories: EventCategory[];
  filteredCategories: EventCategory[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ filteredCategories }) => {
  const { language } = useLanguage();
  
  // Month names for the timeline
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
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
  );
};

export default TimelineView;
