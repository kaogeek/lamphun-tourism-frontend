
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EventCategory } from '@/types/events';

interface CategoryGridProps {
  categories: EventCategory[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const { language } = useLanguage();
  
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            >
              <div className={`absolute inset-0 ${category.color} bg-opacity-80`}></div>
              <img 
                src={category.image} 
                alt={category.name[language as keyof typeof category.name]}
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {category.name[language as keyof typeof category.name]}
                </h2>
                <ul className="space-y-2">
                  {category.events.map((event) => (
                    <li key={event.id} className="flex items-center">
                      <span className="text-lg">•</span>
                      <span className="ml-2">{event.name[language as keyof typeof event.name]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {category.id === selectedCategory && (
                <div className="absolute top-4 right-4 bg-white text-primary p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
