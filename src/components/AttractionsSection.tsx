
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useGetPlaces } from '@/hooks/api/useGetPlaces';
import { Skeleton } from './ui/skeleton';

const attractions = [
  {
    id: 1,
    name: {
      th: 'วัดพระธาตุหริภุญชัย',
      en: 'Wat Phra That Hariphunchai',
      cn: '哈里奔猜佛寺',
      jp: 'ワット・プラタート・ハリプンチャイ'
    },
    image: '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png',
    category: {
      th: 'วัด',
      en: 'Temple',
      cn: '寺庙',
      jp: '寺院'
    }
  },
  {
    id: 2,
    name: {
      th: 'อนุสรณ์สถานจามเทวี',
      en: 'Jamatevi',
      cn: '贾迈特维',
      jp: 'ジャマティエビ'
    },
    image: '/lovable-uploads/jamatevi.png',
    category: {
      th: 'อนุสรณ์สถาน',
      en: 'Memorial',
      cn: '纪念碑',
      jp: '記念碑'
    }
  },
  {
    id: 3,
    name: {
      th: 'พระธาตุอินแขวะ',
      en: 'In Kwean Pagoda',
      cn: '因宽寺',
      jp: 'インクェーン寺'
    },
    image: '/lovable-uploads/prathat-in-kwean.png',
    category: {
      th: 'วัด',
      en: 'Temple',
      cn: '寺庙',
      jp: '寺院'
    }
  },
];

const AttractionsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const { data, isLoading } = useGetPlaces();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">{t('attractions.title')}</h2>
          <Link to="/attractions">
            <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
              {t('attractions.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading && data.data.length > 0 && data.data.map((attraction) => (
            <Link to={`/attractions/${attraction.id}`} key={attraction.id}>
              <Card className="overflow-hidden card-hover">
                <div className="h-52 overflow-hidden">
                  {/* TODO: Add image */}
                  {/* <img 
                    src={attraction.images[0]} 
                    alt={`${attraction.name}-image`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  /> */}
                  <Skeleton className="w-full h-full" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-full">
                      {attraction.shortDescription}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {attraction.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
