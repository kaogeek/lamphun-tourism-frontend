
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EventHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EventHero: React.FC<EventHeroProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative pt-20 pb-10 bg-gray-50">
      <div className="container mt-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Tourism Calendar of Lamphun
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Discover upcoming events and festivals in Lamphun throughout the year.
        </p>
        
        {/* Search bar */}
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search events..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
