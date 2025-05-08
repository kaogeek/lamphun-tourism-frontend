
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const attractions = [
  {
    id: 1,
    name: {
      th: 'วัดพระธาตุหริภุญชัย',
      en: 'Wat Phra That Hariphunchai',
      cn: '哈里奔猜佛寺',
      jp: 'ワット・プラタート・ハリプンチャイ'
    },
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80',
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
      th: 'อุทยานแห่งชาติดอยขุนตาล',
      en: 'Doi Khun Tan National Park',
      cn: '堆昆丹国家公园',
      jp: 'ドイ・クンタン国立公園'
    },
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80',
    category: {
      th: 'อุทยาน',
      en: 'Park',
      cn: '公园',
      jp: '公園'
    }
  },
  {
    id: 3,
    name: {
      th: 'พิพิธภัณฑ์เมืองลำพูน',
      en: 'Lamphun Museum',
      cn: '南奔博物馆',
      jp: 'ランプーン博物館'
    },
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80',
    category: {
      th: 'พิพิธภัณฑ์',
      en: 'Museum',
      cn: '博物馆',
      jp: '博物館'
    }
  },
];

const AttractionsSection: React.FC = () => {
  const { t, language } = useLanguage();

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
          {attractions.map((attraction) => (
            <Link to={`/attractions/${attraction.id}`} key={attraction.id}>
              <Card className="overflow-hidden card-hover">
                <div className="h-52 overflow-hidden">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name[language as keyof typeof attraction.name]} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-full">
                      {attraction.category[language as keyof typeof attraction.category]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {attraction.name[language as keyof typeof attraction.name]}
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
