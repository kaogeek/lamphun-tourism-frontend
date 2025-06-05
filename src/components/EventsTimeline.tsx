import React, { useState } from 'react';
import VerticalTimeline from './events/VerticalTimeline';
import YearlyTimeline from './events/YearlyTimeline';
import { eventCategories } from '@/data/eventData';
import { Button } from '@/components/ui/button';
import { CalendarRange, ListOrdered } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

const EventsTimeline: React.FC = () => {
  // Default to vertical timeline for better focus on upcoming events
  const [viewMode, setViewMode] = useState<'vertical' | 'yearly'>('vertical');
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <div className="">
      {/* View toggle buttons */}
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          {/* <Button 
            variant={viewMode === 'yearly' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setViewMode('yearly')}
            className="flex items-center gap-1"
          >
            <CalendarRange className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : "inline"}>ปฏิทินรายปี</span>
          </Button> */}
          <Button
            variant={viewMode === 'vertical' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('vertical')}
            className="flex items-center gap-1"
          >
            <ListOrdered className="h-4 w-4" />
            <span className={isMobile ? 'sr-only' : 'inline'}>รายการกิจกรรม</span>
          </Button>
        </div>
      </div>

      {/* Timeline content */}
      <div>{viewMode === 'vertical' ? <VerticalTimeline /> : <YearlyTimeline categories={eventCategories} />}</div>
    </div>
  );
};

export default EventsTimeline;
