
import React, { useState } from 'react';
import VerticalTimeline from './events/VerticalTimeline';
import YearlyTimeline from './events/YearlyTimeline';
import { eventCategories } from '@/data/eventData';
import { Button } from '@/components/ui/button';
import { CalendarRange, ListOrdered } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EventsTimeline: React.FC = () => {
  const [viewMode, setViewMode] = useState<'vertical' | 'yearly'>('yearly');
  const isMobile = useIsMobile();
  
  return (
    <div className="container py-8">
      {/* View toggle buttons */}
      <div className="flex justify-end mb-6">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <Button 
            variant={viewMode === 'yearly' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setViewMode('yearly')}
            className="flex items-center gap-1"
          >
            <CalendarRange className="h-4 w-4" />
            <span className={isMobile ? "" : "inline"}>ปฏิทินรายปี</span>
          </Button>
          <Button 
            variant={viewMode === 'vertical' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setViewMode('vertical')}
            className="flex items-center gap-1"
          >
            <ListOrdered className="h-4 w-4" />
            <span className={isMobile ? "" : "inline"}>รายการกิจกรรม</span>
          </Button>
        </div>
      </div>
      
      {viewMode === 'vertical' ? (
        <VerticalTimeline />
      ) : (
        <YearlyTimeline categories={eventCategories} />
      )}
    </div>
  );
};

export default EventsTimeline;
