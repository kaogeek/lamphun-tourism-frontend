import { Place } from '@/lib/api/types/places';
import { resolveUrl } from '@/lib/file-upload';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface AttractionCardProps {
  place: Place;
}

const AttractionCard = ({ place }: AttractionCardProps) => (
  <Link to={`/attractions/${place.slug}`}>
    <Card className="overflow-hidden h-full card-hover">
      <div className="h-48 overflow-hidden">
        <img
          src={resolveUrl(place.coverImage?.url)}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
            {place.placeCategory?.name}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{place.name}</h3>
        <p className="text-gray-600 line-clamp-3">{place.shortDescription}</p>
        <Button variant="link" className="text-primary p-0 mt-2">
          {t('common.buttons.readMore')}
        </Button>
      </CardContent>
    </Card>
  </Link>
);

export default AttractionCard;
