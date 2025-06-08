import { useGetPlaces } from '@/hooks/api/useGetPlaces';
import { getTranslateWithFallback } from '@/lib/i18n';
import { INITIAL_VIEW_STATE } from '@/lib/map-config';
import { useTranslation } from 'react-i18next';
import MapView from './map/MapView';

const PopularAttractionsMap: React.FC = () => {
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
    <MapView
      places={translatedItems.map((place) => ({
        id: place.documentId,
        name: place.name,
        shortDescription: place.shortDescription,
        lat: place.lat,
        lng: place.lng,
      }))}
      initialViewState={INITIAL_VIEW_STATE}
    />
  );
};

export default PopularAttractionsMap;
