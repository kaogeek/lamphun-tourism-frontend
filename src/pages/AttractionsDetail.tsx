
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

// Mock data
const attractionsData = [
  {
    id: 1,
    name: {
      th: 'วัดพระธาตุหริภุญชัย',
      en: 'Wat Phra That Hariphunchai',
      cn: '哈里奔猜佛寺',
      jp: 'ワット・プラタート・ハリプンチャイ'
    },
    description: {
      th: 'วัดพระธาตุหริภุญชัยเป็นวัดสำคัญของจังหวัดลำพูน สร้างขึ้นในสมัยอาณาจักรหริภุญชัย ตั้งแต่ปี พ.ศ. 1651 โดยพระเจ้าอาทิตยราช ปูชนียสถานสำคัญคือพระเจดีย์ใหญ่ซึ่งบรรจุพระบรมสารีริกธาตุของพระพุทธเจ้า เป็นศิลปะล้านนาที่งดงาม นักท่องเที่ยวจะได้สัมผัสกับประวัติศาสตร์และศิลปวัฒนธรรมล้านนาที่น่าประทับใจ',
      en: 'Wat Phra That Hariphunchai is a significant temple in Lamphun, established during the Hariphunchai Kingdom in 1108 AD by King Athittayarat. The main attraction is the large chedi (pagoda) that contains relics of the Buddha, showcasing beautiful Lanna architectural style. Visitors can experience impressive history and traditional Lanna art and culture throughout the temple complex.',
      cn: '哈里奔猜佛寺是南奔府的重要寺庙，建于公元1108年哈里奔猜王国时期，由阿提塔亚拉特国王建造。寺庙的主要景点是一座大型佛塔，内有佛陀舍利，展示了精美的兰纳建筑风格。游客可以在整个寺庙建筑群中体验令人印象深刻的历史和传统兰纳艺术文化。',
      jp: 'ワット・プラタート・ハリプンチャイはランプーン県の重要な寺院で、1108年にアティタヤラート王によってハリプンチャイ王国時代に建てられました。主な見どころは、仏陀の遺骨を納めた大きな仏塔で、美しいランナー建築様式を示しています。訪問者は、寺院全体で印象的な歴史と伝統的なランナー芸術文化を体験できます。'
    },
    fullDescription: {
      th: 'วัดพระธาตุหริภุญชัยเป็นวัดสำคัญของจังหวัดลำพูน สร้างขึ้นในสมัยอาณาจักรหริภุญชัย ตั้งแต่ปี พ.ศ. 1651 โดยพระเจ้าอาทิตยราช ปูชนียสถานสำคัญคือพระเจดีย์ใหญ่ซึ่งบรรจุพระบรมสารีริกธาตุของพระพุทธเจ้า เป็นศิลปะล้านนาที่งดงาม นักท่องเที่ยวจะได้สัมผัสกับประวัติศาสตร์และศิลปวัฒนธรรมล้านนาที่น่าประทับใจ\n\nพระธาตุหริภุญชัยได้รับการบูรณปฏิสังขรณ์หลายครั้งตั้งแต่อดีตจนถึงปัจจุบัน องค์พระธาตุเป็นทรงระฆังกลมขนาดใหญ่ ฐานเป็นสี่เหลี่ยมประดับลวดลายปูนปั้น ยอดฉัตรทำด้วยทองคำ การเข้าชมวัดพระธาตุหริภุญชัย ผู้ชมควรแต่งกายสุภาพเรียบร้อย ถอดรองเท้าเมื่อเข้าสู่เขตพระวิหาร และปฏิบัติตามกฎระเบียบของวัด',
      en: 'Wat Phra That Hariphunchai is a significant temple in Lamphun, established during the Hariphunchai Kingdom in 1108 AD by King Athittayarat. The main attraction is the large chedi (pagoda) that contains relics of the Buddha, showcasing beautiful Lanna architectural style. Visitors can experience impressive history and traditional Lanna art and culture throughout the temple complex.\n\nThe Phra That Hariphunchai has been restored many times from ancient times to the present. The pagoda is a large bell-shaped structure with a square base decorated with stucco patterns, and the spire is made of gold. When visiting Wat Phra That Hariphunchai, visitors should dress modestly, remove shoes when entering the temple area, and observe temple rules and regulations.',
      cn: '哈里奔猜佛寺是南奔府的重要寺庙，建于公元1108年哈里奔猜王国时期，由阿提塔亚拉特国王建造。寺庙的主要景点是一座大型佛塔，内有佛陀舍利，展示了精美的兰纳建筑风格。游客可以在整个寺庙建筑群中体验令人印象深刻的历史和传统兰纳艺术文化。\n\n哈里奔猜佛塔从古至今多次修复。佛塔是一个钟形结构，方形底座装饰有灰泥图案，尖顶由黄金制成。参观哈里奔猜佛寺时，游客应该穿着得体，进入寺庙区域时脱鞋，并遵守寺庙的规章制度。',
      jp: 'ワット・プラタート・ハリプンチャイはランプーン県の重要な寺院で、1108年にアティタヤラート王によってハリプンチャイ王国時代に建てられました。主な見どころは、仏陀の遺骨を納めた大きな仏塔で、美しいランナー建築様式を示しています。訪問者は、寺院全体で印象的な歴史と伝統的なランナー芸術文化を体験できます。\n\nプラタート・ハリプンチャイは、古代から現在まで何度も修復されています。仏塔は鐘形の大きな構造物で、四角い基部には漆喰の模様が施され、尖塔は金で作られています。ワット・プラタート・ハリプンチャイを訪れる際は、控えめな服装をし、寺院エリアに入る際には靴を脱ぎ、寺院の規則や規制を守るべきです。'
    },
    image: '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png',
    gallery: [
      '/lovable-uploads/0f943779-f83a-4266-9e7d-21a27385906c.png',
      '/lovable-uploads/cultural.jpg',
      '/lovable-uploads/c5a8cc54-e462-469c-8fca-9c7f191ec2e6.png',
    ],
    location: {
      th: 'ตำบลในเมือง อำเภอเมือง จังหวัดลำพูน',
      en: 'Nai Mueang, Mueang Lamphun District, Lamphun',
      cn: '南奔府南奔县内城镇',
      jp: 'ランプーン県ムアン区ナイムアン'
    },
    openingHours: {
      th: 'เปิดทุกวัน 06:00 - 18:00 น.',
      en: 'Open daily 6:00 AM - 6:00 PM',
      cn: '每天上午6点至下午6点开放',
      jp: '毎日午前6時から午後6時まで'
    },
    coordinates: {
      lat: 18.5747,
      lng: 99.0087
    },
    category: {
      th: 'วัด',
      en: 'Temple',
      cn: '寺庙',
      jp: '寺院'
    }
  }
  // Additional attractions would be listed here
];

const AttractionsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const attraction = attractionsData.find(item => item.id === Number(id));

  if (!attraction) {
    return (
      <>
        <Navbar />
        <div className="container mt-32 mb-32 text-center">
          <h1 className="text-3xl font-bold">Attraction not found</h1>
          <Link to="/attractions" className="mt-4 inline-block text-primary hover:underline">
            Back to attractions
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % attraction.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? attraction.gallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      
      <div className="container mt-32 mb-16">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/attractions" className="text-primary hover:text-primary/80 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to attractions
          </Link>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image gallery */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg h-80 md:h-96 mb-4">
              <img 
                src={attraction.gallery[currentImageIndex]} 
                alt={attraction.name[language as keyof typeof attraction.name]}
                className="w-full h-full object-cover"
              />
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex space-x-2 mb-8">
              {attraction.gallery.map((img, index) => (
                <div 
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer ${
                    index === currentImageIndex ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
            
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-4">
                {attraction.name[language as keyof typeof attraction.name]}
              </h1>
              
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {attraction.category[language as keyof typeof attraction.category]}
                </span>
              </div>
              
              <div className="whitespace-pre-line">
                {attraction.fullDescription[language as keyof typeof attraction.fullDescription]}
              </div>
            </div>
          </div>
          
          {/* Right column - Details */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Information</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">
                        {attraction.location[language as keyof typeof attraction.location]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-gray-600">
                        {attraction.openingHours[language as keyof typeof attraction.openingHours]}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Map</h4>
                  <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                    {/* Map placeholder - would be replaced with actual map */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Interactive Map Placeholder
                    </div>
                  </div>
                  <Link to="/map" className="mt-2 text-primary hover:underline text-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    View on full map
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Nearby Attractions</h3>
              <div className="space-y-4">
                {attractionsData.filter(a => a.id !== attraction.id).slice(0, 2).map(item => (
                  <Link to={`/attractions/${item.id}`} key={item.id}>
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                      <div className="w-16 h-16 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name[language as keyof typeof item.name]} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2">
                          {item.name[language as keyof typeof item.name]}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.category[language as keyof typeof item.category]}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AttractionsDetail;
