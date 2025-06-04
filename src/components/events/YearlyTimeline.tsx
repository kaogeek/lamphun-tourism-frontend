import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChartGantt } from 'lucide-react';
import { EventCategory } from '@/types/events';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { format, isWithinInterval, startOfYear, endOfYear, compareAsc } from 'date-fns';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface YearlyTimelineProps {
  categories: EventCategory[];
}

const YearlyTimeline: React.FC<YearlyTimelineProps> = ({ categories }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Get all events from all categories
  const allEvents = categories.flatMap((category) =>
    category.events.map((event) => ({
      ...event,
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color,
    }))
  );

  // Filter events for the selected year
  const yearStart = startOfYear(new Date(selectedYear, 0, 1));
  const yearEnd = endOfYear(new Date(selectedYear, 0, 1));

  const eventsInYear = allEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      return isWithinInterval(eventDate, { start: yearStart, end: yearEnd });
    })
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  // Function to get category color
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || 'bg-primary';
  };

  // Function to get category image
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

  // Previous and next year handlers
  const goToPreviousYear = () => setSelectedYear(selectedYear - 1);
  const goToNextYear = () => setSelectedYear(selectedYear + 1);

  // Function to position the event on the timeline
  const calculateEventPosition = (eventDate: Date) => {
    const startOfTheYear = startOfYear(new Date(selectedYear, 0, 1));
    const totalDaysInYear = endOfYear(startOfTheYear).getDate() - startOfTheYear.getDate() + 365; // Use 365 to ensure correct calculation
    const dayOfYear = Math.floor((eventDate.getTime() - startOfTheYear.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate position as percentage of year
    return Math.max(0, Math.min(100, (dayOfYear / totalDaysInYear) * 100));
  };

  // Generate month labels based on device
  const generateMonthLabels = () => {
    const monthLabels = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(selectedYear, i, 1);
      monthLabels.push({
        month: i,
        label: format(month, isMobile ? 'MMM' : 'MMMM'),
      });
    }
    return monthLabels;
  };

  const monthLabels = generateMonthLabels();

  // Calculate vertical spacing for events to avoid overlapping
  const calculateVerticalPosition = (eventIndex: number, eventDate: Date) => {
    const sameMonthEvents = eventsInYear.filter((e) => {
      const eDate = new Date(e.date);
      return eDate.getMonth() === eventDate.getMonth();
    });

    const sameMonthIndex = sameMonthEvents.findIndex((e) => e.id === eventsInYear[eventIndex].id);
    return sameMonthIndex * 60 + 60; // 60px spacing between events in the same month
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Year navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm" onClick={goToPreviousYear}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            {selectedYear - 1}
          </Button>

          <div className="flex items-center space-x-2">
            <ChartGantt className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">{selectedYear}</h2>
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>

          <Button variant="outline" size="sm" onClick={goToNextYear}>
            {selectedYear + 1}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Timeline container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Month labels */}
          <div className={`grid grid-cols-${isMobile ? '4' : '12'} bg-gray-50 border-b`}>
            {monthLabels.slice(0, isMobile ? 4 : 12).map((monthData, index) => (
              <div key={index} className="p-2 text-center text-sm font-medium border-r last:border-r-0">
                {monthData.label}
              </div>
            ))}
          </div>

          {/* Timeline content */}
          <div className="relative min-h-[400px] p-4">
            {/* Show selector for additional months on mobile */}
            {isMobile && (
              <div className="mb-4 flex justify-center">
                <select
                  className="p-2 border rounded-md"
                  onChange={(e) => {
                    const section = document.getElementById(`month-${e.target.value}`);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {monthLabels.map((monthData, index) => (
                    <option key={index} value={monthData.month}>
                      {monthData.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Month grid lines */}
            <div className={`grid grid-cols-${isMobile ? '4' : '12'} absolute inset-0 pointer-events-none`}>
              {monthLabels.slice(0, isMobile ? 4 : 12).map((_, index) => (
                <div key={index} className="h-full border-r last:border-r-0 border-gray-200" />
              ))}
            </div>

            {/* Events */}
            {eventsInYear.length > 0 ? (
              <div className="relative">
                {eventsInYear.map((event, index) => {
                  const eventDate = new Date(event.date);
                  const position = calculateEventPosition(eventDate);
                  const categoryColor = getCategoryColor(event.categoryId);
                  const verticalPosition = calculateVerticalPosition(index, eventDate);

                  return (
                    <div
                      key={event.id}
                      className="absolute transform -translate-y-1/2"
                      style={{
                        left: `${position}%`,
                        top: `${verticalPosition}px`,
                        zIndex: 10,
                      }}
                      id={`month-${eventDate.getMonth()}`}
                    >
                      <Link to={`/events/${event.id}`} className={`flex flex-col items-center group`}>
                        {/* Vertical line connecting to timeline */}
                        <div className={`w-0.5 h-6 ${categoryColor.replace('bg-', 'bg-opacity-50 bg-')}`} />

                        {/* Event marker with date */}
                        <div
                          className={`${categoryColor} rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-bold shadow-md transition-transform transform hover:scale-110`}
                        >
                          {format(eventDate, 'dd')}
                        </div>

                        {/* Event details card - hidden by default, shown on hover/tap */}
                        <div
                          className={`absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-20 ${isMobile ? 'group-active:opacity-100' : ''}`}
                        >
                          <div
                            className={`bg-white ${categoryColor.replace('bg-', 'border-l-4 border-')} rounded shadow-lg p-3 w-48 text-left transform -translate-x-1/2`}
                          >
                            <div className="text-xs text-gray-500 mb-1">{format(eventDate, 'dd MMMM yyyy')}</div>
                            <h4 className="font-medium text-sm mb-1 line-clamp-2">
                              {event.name[language as keyof typeof event.name]}
                            </h4>
                            <div className="w-full h-24 rounded overflow-hidden mb-2">
                              <img
                                src={getCategoryImage(event.categoryId)}
                                alt={event.name[language as keyof typeof event.name]}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex justify-between items-center">
                              <span
                                className={`text-xs py-0.5 px-2 rounded-full ${categoryColor} ${categoryColor.includes('bg-white') ? 'text-black' : 'text-white'}`}
                              >
                                {event.categoryName[language as keyof typeof event.categoryName]}
                              </span>
                              <span className="text-xs text-primary">View details</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">No events for {selectedYear}</p>
              </div>
            )}
          </div>

          {/* Category legend */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <div className={`${category.color} w-3 h-3 rounded-full mr-2`}></div>
                  <span className="text-sm">{category.name[language as keyof typeof category.name]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view: Display events as a list grouped by month */}
        {isMobile && eventsInYear.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Events in {selectedYear}</h3>
            <div className="space-y-4">
              {Array.from({ length: 12 }, (_, i) => i)
                .map((month) => {
                  const monthEvents = eventsInYear.filter((event) => {
                    const eventDate = new Date(event.date);
                    return eventDate.getMonth() === month;
                  });

                  if (monthEvents.length === 0) return null;

                  return (
                    <div key={month} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 p-3 font-medium">
                        {format(new Date(selectedYear, month, 1), 'MMMM')}
                      </div>
                      <div className="divide-y">
                        {monthEvents.map((event) => {
                          const eventDate = new Date(event.date);
                          const categoryColor = getCategoryColor(event.categoryId);

                          return (
                            <Link
                              key={event.id}
                              to={`/events/${event.id}`}
                              className="flex items-center p-3 hover:bg-gray-50"
                            >
                              <div
                                className={`${categoryColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3`}
                              >
                                {format(eventDate, 'dd')}
                              </div>
                              <div>
                                <h4 className="font-medium line-clamp-1">
                                  {event.name[language as keyof typeof event.name]}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{format(eventDate, 'dd MMM yyyy')}</span>
                                  <span className={`ml-2 px-2 py-0.5 rounded-full text-white ${categoryColor}`}>
                                    {event.categoryName[language as keyof typeof event.categoryName]}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
                .filter(Boolean)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearlyTimeline;
