import { useGetEventCategories } from '@/hooks/api/useGetCategories';
import { EventCategory } from '@/lib/api/types/event-categories';
import { resolveUrl } from '@/lib/file-upload';
import { getTranslateWithFallback } from '@/lib/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorState from '../state/ErrorState';
import { Skeleton } from '../ui/skeleton';

interface CategoryGridProps {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ selectedCategory, setSelectedCategory }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data, isLoading, error } = useGetEventCategories({
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
        onClick={() => setSelectedCategory(category.documentId)}
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

  const CategoryCardSkeleton = () => {
    return (
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gray-300" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <Skeleton className="h-6 w-1/2 md:w-1/2 mb-4" />
        </div>
      </div>
    );
  };

  const RenderContent = () => {
    if (isLoading) {
      const randomCount = Math.floor(Math.random() * 6) + 1;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: randomCount }, (_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <ErrorState />;
    }

    const items = data?.data;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items
          .map((category) => getTranslateWithFallback(category, language))
          .map((category) => {
            return (
              <React.Fragment key={category.documentId}>
                <CategoryCard category={category}></CategoryCard>
              </React.Fragment>
            );
          })}
      </div>
    );
  };

  return (
    <div className="py-12 bg-white">
      <div className="container">
        <RenderContent />
      </div>
    </div>
  );
};

export default CategoryGrid;
