
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
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
    description: {
      th: 'วัดพระธาตุหริภุญชัยเป็นวัดสำคัญของจังหวัดลำพูน สร้างขึ้นในสมัยอาณาจักรหริภุญชัย',
      en: 'Wat Phra That Hariphunchai is an important temple in Lamphun, built during the Hariphunchai Kingdom.',
      cn: '哈里奔猜佛寺是南奔府的重要寺庙，建于哈里奔猜王国时期。',
      jp: 'ワット・プラタート・ハリプンチャイはランプーン県の重要な寺院で、ハリプンチャイ王国時代に建てられました。'
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
      th: 'วัดมหาวันวรมหาวิหาร',
      en: 'Doi Khun Tan National Park',
      cn: '堆昆丹国家公园',
      jp: 'ドイ・クンタン国立公園'
    },
    description: {
      th: 'เป็นวัดโบราณ สร้างในสมัยพระนางเจ้าจามเทวี เมื่อแรกเดินทางมาครองเมืองหริภุญชัย เป็นหนึ่งในวัดสี่มุมเมือง ตั้งอยู่ทางทิศตะวันตกของนครหริภุญชัยสิ่งปลูกสร้างในวัดล้วนสร้างขึ้นใหม่จนไม่หลงเหลือของเดิม แต่ที่ทำให้วัดเป็นที่รู้จักอย่างกว้างขวางเพราะเป็นแหล่งที่พบพระรอด และพระรอดหลวง ซึ่งเป็นหนึ่งในพระเครื่องเบญจภาคี กระจัดกระจายอยู่ทั่วไปเมื่อหลายสิบปีก่อน',
      en: 'An ancient temple built during the reign of Queen Chamadevi when she first came to rule Hariphunchai. It is one of the four corner temples of the city.',
      cn: '这是一座古老的寺庙，建于查玛德维女王统治时期，当时她首次来到哈里奔猜统治。它是城市四角寺庙之一。',
      jp: 'ハリプンチャイを統治するために最初に来たチャマデヴィ女王の時代に建てられた古代寺院です。街の四隅の寺院の一つです。'
    },
    image: '/lovable-uploads/วัดมหาวันวรมหาวิหาร.jpg',
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
      th: 'วัดกู่ป่าลาน',
      en: 'Khu Pha Lan',
      cn: '库帕兰寺',
      jp: 'クー・ファラン寺'
    },
    description: {
      th: 'วัดกู่ป่าลานเป็นโบราณสถานที่เก่าแก่ที่สุดในอำเภอบ้านธิ ทางกรมศิลปากรได้ขึ้นทะเบียนเป็นโบราณสถานเมื่อปี 2533',
      en: 'Khu Pha Lan is the oldest historical site in the Baan Thi district. The Department of Fine Arts has registered it as a historical site in 2533.',
      cn: '库帕兰寺是巴安提地区最古老的遗址。文化部已将其登记为历史遗址，时间为2533年。',
      jp: 'クー・ファラン寺は、バーン・ティ地区で最も古い遺跡です。文化省は、2533年に歴史的遺跡として登録しました。'
    },
    image: '/lovable-uploads/วัดกู่ป่าลาน.jpeg',
    category: {
      th: 'วัด',
      en: 'Temple',
      cn: '寺庙',
      jp: '寺院'
    }
  },
  {
    id: 4,
    name: {
      th: 'บ้านพระยาเจ้าดารารัศมี',
      en: 'Dara Rasmi House',
      cn: '达拉·拉斯米故居',
      jp: 'ダーラー・ラスミー邸'
    },
    description: {
      th: 'บ้านพระยาเจ้าดารารัศมีเป็นบ้านไม้โบราณแสดงประวัติและวิถีชีวิต',
      en: 'Dara Rasmi House is an ancient wooden house showing history and lifestyle.',
      cn: '达拉·拉斯米故居是一座古老的木房子，展示了历史和生活方式。',
      jp: 'ダーラー・ラスミー邸は、歴史と生活様式を示す古代の木造家屋です。'
    },
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80',
    category: {
      th: 'อาคารประวัติศาสตร์',
      en: 'Historic Building',
      cn: '历史建筑',
      jp: '歴史的建造物'
    }
  },
  {
    id: 5,
    name: {
      th: 'วัดจามเทวี',
      en: 'Wat Chamthewi',
      cn: '战提维寺',
      jp: 'ワット・チャムテーウィー'
    },
    description: {
      th: 'วัดจามเทวีเป็นวัดเก่าแก่ที่สร้างขึ้นในสมัยพระนางจามเทวี',
      en: 'Wat Chamthewi is an ancient temple built during Queen Chamthewi period.',
      cn: '战提维寺是在提维女王时期建造的古寺。',
      jp: 'ワット・チャムテーウィーは、チャムテーウィー女王時代に建てられた古代の寺院です。'
    },
    image: '/lovable-uploads/watchamathevi.jpg',
    category: {
      th: 'วัด',
      en: 'Temple',
      cn: '寺庙',
      jp: '寺院'
    }
  },
  {
    id: 6,
    name: {
      th: 'หมู่บ้านหัตถกรรมทอผ้า',
      en: 'Weaving Village',
      cn: '编织村',
      jp: '織物村'
    },
    description: {
      th: 'หมู่บ้านหัตถกรรมทอผ้าเป็นแหล่งผลิตผ้าทอมือที่มีชื่อเสียงของลำพูน',
      en: 'Weaving Village is famous for handwoven textiles in Lamphun.',
      cn: '编织村是南奔著名的手工织物产地。',
      jp: '織物村は、ランプーンの手織りテキスタイルで有名です。'
    },
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80',
    category: {
      th: 'หัตถกรรม',
      en: 'Craft',
      cn: '工艺',
      jp: '工芸'
    }
  },
];

const categories = [
  {
    th: 'ทั้งหมด',
    en: 'All',
    cn: '全部',
    jp: 'すべて'
  },
  {
    th: 'วัด',
    en: 'Temple',
    cn: '寺庙',
    jp: '寺院'
  },
  {
    th: 'อุทยาน',
    en: 'Park',
    cn: '公园',
    jp: '公園'
  },
  {
    th: 'พิพิธภัณฑ์',
    en: 'Museum',
    cn: '博物馆',
    jp: '博物館'
  },
  {
    th: 'อาคารประวัติศาสตร์',
    en: 'Historic Building',
    cn: '历史建筑',
    jp: '歴史的建造物'
  },
  {
    th: 'หัตถกรรม',
    en: 'Craft',
    cn: '工艺',
    jp: '工芸'
  }
];

const Attractions: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesSearch = attraction.name[language as keyof typeof attraction.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
      attraction.category[language as keyof typeof attraction.category] === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-10 bg-primary/5">
        <div className="container mt-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('nav.attractions')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore the beautiful attractions and landmarks in Lamphun.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search attractions..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select 
                  className="w-full h-10 px-3 border border-input bg-background rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.en}>
                      {category[language as keyof typeof category]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Attractions List */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction) => (
              <Link to={`/attractions/${attraction.id}`} key={attraction.id}>
                <Card className="overflow-hidden h-full card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name[language as keyof typeof attraction.name]} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {attraction.category[language as keyof typeof attraction.category]}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {attraction.name[language as keyof typeof attraction.name]}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {attraction.description[language as keyof typeof attraction.description]}
                    </p>
                    <Button variant="link" className="text-primary p-0 mt-2">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Attractions;
