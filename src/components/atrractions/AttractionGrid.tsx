import { useGetPlaces } from '@/hooks/api/useGetPlaces';
import { getTranslateWithFallback } from '@/lib/i18n';
import { t } from 'i18next';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../state/EmptyState';
import ErrorState from '../state/ErrorState';
import AttractionCard from './AttractionCard';
import AttractionCardSkeleton from './AttractionCardSkeleton';

interface AttractionCardProps {
  search: string;
  selectedCategory: string;
}

const AttractionGrid = ({ search, selectedCategory }: AttractionCardProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data, isLoading, error } = useGetPlaces({
    filters: {
      name: {
        $contains: search,
      },
      placeCategory: {
        documentId: {
          $eq: selectedCategory || null,
        },
      },
    },
    populate: {
      coverImage: true,
      placeCategory: true,
      localizations: {
        populate: {
          coverImage: true,
          placeCategory: true,
        },
      },
    },
  });

  if (isLoading) {
    const randomCount = Math.floor(Math.random() * 6) + 1;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: randomCount }, (_, index) => (
          <AttractionCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState />;
  }

  const items = data?.data ?? [];

  if (!items.length) {
    return <EmptyState title={t('attractions.empty.title')} msg={t('attractions.empty.msg')} icon={<MapPin />} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items
          .map((place) => getTranslateWithFallback(place, language, ['slug']))
          .map((place) => (
            <AttractionCard key={place.documentId} place={place} />
          ))}
      </div>
    </>
  );
};
export default AttractionGrid;
