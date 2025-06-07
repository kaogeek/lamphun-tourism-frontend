import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGetEventCategories } from '@/hooks/api/useGetCategories';
import { resolveUrl } from '@/lib/file-upload';
import { EventCategory } from '@/lib/api/types/event-categories';

interface CategoryGridProps {
  categories: EventCategory[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  const { language } = useLanguage();
  const { data, isLoading } = useGetEventCategories({
    populate: {
      coverImage: true,
      localizations: {
        populate: ['coverImage'],
      },
    },
  });

  // TODO move to component later
  const CategoryCard = ({ category }: { category: EventCategory }) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer hover:shadow-xl transition-all duration-300"
        // onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
      >
        <div
          className={`absolute inset-0 bg-opacity-80`}
          style={{
            backgroundColor: category.color,
          }}
        ></div>
        <img
          src={resolveUrl(category.coverImage?.url)}
          alt={category.name}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{category.name}</h2>
        </div>
        {category.documentId === selectedCategory && (
          <div className="absolute top-4 right-4 bg-white text-primary p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  // TODO move to component later
  const CategoryCardSkeleton = () => {
    return (
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] animate-pulse bg-gray-200">
        <div className="absolute inset-0 bg-gray-300 bg-opacity-80"></div>

        <div className="w-full h-full object-cover bg-gray-400 mix-blend-overlay" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <div className="h-6 md:h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
        </div>

        <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-gray-300" />
      </div>
    );
  };

  const RenderContent = () => {
    if (isLoading) {
      const randomCount = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
      return (
        <React.Fragment>
          {Array.from({ length: randomCount }, (_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </React.Fragment>
      );
    }
    return data?.data.map((category) => (
      <React.Fragment key={category.documentId}>{CategoryCard({ category })}</React.Fragment>
    ));
  };

  return (
    <div className="py-12 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">{RenderContent()}</div>
      </div>
    </div>
  );
};

export default CategoryGrid;
