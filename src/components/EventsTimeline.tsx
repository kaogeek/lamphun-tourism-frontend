
import React, { useState } from 'react';
import VerticalTimeline from './events/VerticalTimeline';
import YearlyTimeline from './events/YearlyTimeline';
import { eventCategories } from '@/data/eventData';
import { Button } from '@/components/ui/button';
import { CalendarRange, ListOrdered } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/context/LanguageContext';

const EventsTimeline: React.FC = () => {
  const [viewMode, setViewMode] = useState<'vertical' | 'yearly'>('yearly');
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return (
    <div className="container">
      {/* Section heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{t('events.upcomingEvents')}</h2>
        <p className="text-gray-600 mb-6">
          {t('events.discoverEvents')}
        </p>
      </div>
      
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
            <span className={isMobile ? "sr-only" : "inline"}>ปฏิทินรายปี</span>
          </Button>
          <Button 
            variant={viewMode === 'vertical' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setViewMode('vertical')}
            className="flex items-center gap-1"
          >
            <ListOrdered className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : "inline"}>รายการกิจกรรม</span>
          </Button>
        </div>
      </div>
      
      {/* Timeline content with limited height for homepage */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          {viewMode === 'vertical' ? (
            <VerticalTimeline />
          ) : (
            <YearlyTimeline categories={eventCategories} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsTimeline;
