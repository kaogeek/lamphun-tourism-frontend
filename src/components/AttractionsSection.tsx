import { Button } from '@/components/ui/button';
import { useGetPlaces } from '@/hooks/api/useGetPlaces';
import { getTranslateWithFallback } from '@/lib/i18n';
import { ArrowRight, MapPin } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AttractionCard from './atrractions/AttractionCard';
import AttractionCardSkeleton from './atrractions/AttractionCardSkeleton';
import EmptyState from './state/EmptyState';
import ErrorState from './state/ErrorState';

const AttractionsSection: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { data, isLoading, error } = useGetPlaces({
    pagination: {
      pageSize: 3,
    },
    filters: {
      popular: {
        $eq: true,
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

  const items = data?.data ?? [];
  const translatedItems = items.map((place) => getTranslateWithFallback(place, language, ['slug']));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">{t('attractions.titlePopular')}</h2>
          <Link to="/attractions">
            <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
              {t('attractions.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: Math.floor(Math.random() * 6) + 1 }, (_, index) => (
              <AttractionCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorState />
        ) : !items.length ? (
          <EmptyState title={t('attractions.empty.title')} msg={t('attractions.empty.msg')} icon={<MapPin />} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {translatedItems.map((place) => (
              <AttractionCard key={place.documentId} place={place} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AttractionsSection;
