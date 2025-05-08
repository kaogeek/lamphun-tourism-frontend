
import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';

// Mock data
const attractions = [
  {
    id: 1,
    name: {
      th: 'วัดพระธาตุหริภุญชัย',
      en: 'Wat Phra That Hariphunchai',
      cn: '哈里奔猜佛寺',
      jp: 'ワット・プラタート・ハリプンチャイ'
    },
    description: {
      th: 'วัดสำคัญของจังหวัดลำพูน',
      en: 'Important temple of Lamphun',
      cn: '南奔重要的寺庙',
      jp: 'ランプーンの重要な寺院'
    },
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80',
    location: {
      th: 'ตำบลในเมือง อำเภอเมือง จังหวัดลำพูน',
      en: 'Nai Mueang, Mueang Lamphun District, Lamphun',
      cn: '南奔府南奔县内城镇',
      jp: 'ランプーン県ムアン区ナイムアン'
    },
    coordinates: {
      lat: 18.5747,
      lng: 99.0087
    },
    category: 'temple'
  },
  {
    id: 2,
    name: {
      th: 'อุทยานแห่งชาติดอยขุนตาล',
      en: 'Doi Khun Tan National Park',
      cn: '堆昆丹国家公园',
      jp: 'ドイ・クンタン国立公園'
    },
    description: {
      th: 'อุทยานแห่งชาติที่มีธรรมชาติสวยงาม',
      en: 'National park with beautiful nature',
      cn: '风景优美的国家公园',
      jp: '美しい自然の国立公園'
    },
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80',
    location: {
      th: 'อำเภอป่าซาง จังหวัดลำพูน',
      en: 'Pa Sang District, Lamphun',
      cn: '南奔府帕桑县',
      jp: 'ランプーン県パーサーン区'
    },
    coordinates: {
      lat: 18.3627,
      lng: 99.2362
    },
    category: 'nature'
  },
  {
    id: 3,
    name: {
      th: 'พิพิธภัณฑ์เมืองลำพูน',
      en: 'Lamphun Museum',
      cn: '南奔博物馆',
      jp: 'ランプーン博物館'
    },
    description: {
      th: 'พิพิธภัณฑ์ที่แสดงประวัติศาสตร์เมืองลำพูน',
      en: 'Museum showcasing history of Lamphun city',
      cn: '展示南奔市历史的博物馆',
      jp: 'ランプーン市の歴史を紹介する博物館'
    },
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80',
    location: {
      th: 'ตำบลในเมือง อำเภอเมือง จังหวัดลำพูน',
      en: 'Nai Mueang, Mueang Lamphun District, Lamphun',
      cn: '南奔府南奔县内城镇',
      jp: 'ランプーン県ムアン区ナイムアン'
    },
    coordinates: {
      lat: 18.5696,
      lng: 99.0114
    },
    category: 'museum'
  },
  {
    id: 4,
    name: {
      th: 'หมู่บ้านหัตถกรรมทอผ้า',
      en: 'Weaving Village',
      cn: '编织村',
      jp: '織物村'
    },
    description: {
      th: 'หมู่บ้านที่มีชื่อเสียงด้านการทอผ้า',
      en: 'Village famous for textile weaving',
      cn: '以纺织品闻名的村庄',
      jp: '織物で有名な村'
    },
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80',
    location: {
      th: 'อำเภอป่าซาง จังหวัดลำพูน',
      en: 'Pa Sang District, Lamphun',
      cn: '南奔府帕桑县',
      jp: 'ランプーン県パーサーン区'
    },
    coordinates: {
      lat: 18.4302,
      lng: 98.9238
    },
    category: 'craft'
  },
  {
    id: 5,
    name: {
      th: 'กาดกองต้า',
      en: 'Kad Kong Ta Market',
      cn: '康塔市场',
      jp: 'カート・コンター市場'
    },
    description: {
      th: 'ตลาดท้องถิ่นที่มีสินค้าและอาหารพื้นเมือง',
      en: 'Local market with native products and food',
      cn: '有当地产品和食品的本地市场',
      jp: '地元の製品や食べ物がある地元の市場'
    },
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80',
    location: {
      th: 'อำเภอเมือง จังหวัดลำพูน',
      en: 'Mueang District, Lamphun',
      cn: '南奔府南奔县',
      jp: 'ランプーン県ムアン区'
    },
    coordinates: {
      lat: 18.5783,
      lng: 99.0103
    },
    category: 'shopping'
  }
];

type Category = 'all' | 'temple' | 'nature' | 'museum' | 'craft' | 'shopping';

const categories = [
  { id: 'all', name: { th: 'ทั้งหมด', en: 'All', cn: '全部', jp: 'すべて' } },
  { id: 'temple', name: { th: 'วัด', en: 'Temples', cn: '寺庙', jp: '寺院' } },
  { id: 'nature', name: { th: 'ธรรมชาติ', en: 'Nature', cn: '自然', jp: '自然' } },
  { id: 'museum', name: { th: 'พิพิธภัณฑ์', en: 'Museums', cn: '博物馆', jp: '博物館' } },
  { id: 'craft', name: { th: 'หัตถกรรม', en: 'Crafts', cn: '工艺', jp: '工芸' } },
  { id: 'shopping', name: { th: 'ช้อปปิ้ง', en: 'Shopping', cn: '购物', jp: 'ショッピング' } }
];

const Map: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesSearch = attraction.name[language as keyof typeof attraction.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-10 bg-primary/5">
        <div className="container mt-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('map.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore Lamphun's attractions with our interactive map.
          </p>
        </div>
      </div>
      
      <section className="py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/3 order-2 lg:order-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  {/* Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search locations..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Categories</h3>
                    <Tabs 
                      value={selectedCategory} 
                      onValueChange={(value) => setSelectedCategory(value as Category)}
                      className="w-full"
                    >
                      <TabsList className="flex flex-wrap h-auto bg-muted/50 p-1 mb-4">
                        {categories.map((category) => (
                          <TabsTrigger 
                            key={category.id}
                            value={category.id}
                            className="flex-1 min-w-[80px] h-8 data-[state=active]:bg-white"
                          >
                            {category.name[language as keyof typeof category.name]}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {/* Location List */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Locations ({filteredAttractions.length})</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {filteredAttractions.map((attraction) => (
                        <Card 
                          key={attraction.id} 
                          className={`cursor-pointer hover:bg-primary/5 transition-colors ${
                            selectedLocation === attraction.id ? 'border-primary bg-primary/10' : ''
                          }`}
                          onClick={() => setSelectedLocation(attraction.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 shrink-0 overflow-hidden rounded-md">
                                <img 
                                  src={attraction.image} 
                                  alt={attraction.name[language as keyof typeof attraction.name]}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm line-clamp-1">
                                  {attraction.name[language as keyof typeof attraction.name]}
                                </h4>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {attraction.location[language as keyof typeof attraction.location]}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {filteredAttractions.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No locations found
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Map */}
            <div className="lg:w-2/3 order-1 lg:order-2">
              <div className="bg-gray-200 rounded-lg h-[calc(100vh-200px)] min-h-[600px] relative overflow-hidden">
                {/* Map placeholder - would be replaced with MapLibre implementation */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
                  Interactive Map Placeholder
                  <br />
                  (Will be implemented with MapLibre)
                </div>
                
                {/* Selected Location Info Overlay */}
                {selectedLocation && (
                  <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg shadow-lg p-4">
                    {(() => {
                      const attraction = attractions.find(a => a.id === selectedLocation);
                      if (!attraction) return null;
                      
                      return (
                        <div className="flex items-start space-x-4">
                          <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                            <img 
                              src={attraction.image} 
                              alt={attraction.name[language as keyof typeof attraction.name]}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg">
                              {attraction.name[language as keyof typeof attraction.name]}
                            </h4>
                            <p className="text-gray-600 text-sm mb-2">
                              {attraction.description[language as keyof typeof attraction.description]}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {attraction.location[language as keyof typeof attraction.location]}
                            </p>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => setSelectedLocation(null)}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Note: This is a mockup. The actual implementation will use MapLibre for an interactive map experience.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Map;
