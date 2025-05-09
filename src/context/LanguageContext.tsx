
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'th' | 'en' | 'cn' | 'jp';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');

  const t = (key: string): string => {
    // This is a placeholder for translation functionality
    // In a real app, you would use a proper i18n library
    const translations: Record<Language, Record<string, string>> = {
      th: {
        'nav.home': 'หน้าแรก',
        'nav.attractions': 'สถานที่ท่องเที่ยว',
        'nav.events': 'ปฏิทินกิจกรรม',
        'nav.map': 'แผนที่',
        'hero.title': 'ท่องเที่ยวลำพูน',
        'hero.subtitle': 'เมืองประวัติศาสตร์และวัฒนธรรม',
        'hero.explore': 'ค้นหาสถานที่ท่องเที่ยว',
        'attractions.title': 'สถานที่ท่องเที่ยวยอดนิยม',
        'attractions.viewAll': 'ดูทั้งหมด',
        'events.title': 'กิจกรรมท่องเที่ยว',
        'events.viewCalendar': 'ดูปฏิทินกิจกรรม',
        'map.title': 'แผนที่ท่องเที่ยว',
        'map.explore': 'สำรวจทั้งหมด',
        'footer.rights': 'สงวนลิขสิทธิ์',
        'footer.tourism': 'การท่องเที่ยวลำพูน',
      },
      en: {
        'nav.home': 'Home',
        'nav.attractions': 'Attractions',
        'nav.events': 'Events Calendar',
        'nav.map': 'Map',
        'hero.title': 'Lamphun Tourism',
        'hero.subtitle': 'City of History and Culture',
        'hero.explore': 'Explore Attractions',
        'attractions.title': 'Popular Attractions',
        'attractions.viewAll': 'View All',
        'events.title': 'Tourism Events',
        'events.viewCalendar': 'View Calendar',
        'map.title': 'Tourism Map',
        'map.explore': 'Explore All',
        'footer.rights': 'All Rights Reserved',
        'footer.tourism': 'Lamphun Tourism',
      },
      cn: {
        'nav.home': '首页',
        'nav.attractions': '景点',
        'nav.events': '活动日历',
        'nav.map': '地图',
        'hero.title': '南奔',
        'hero.subtitle': '历史文化之城',
        'hero.explore': '探索景点',
        'attractions.title': '热门景点',
        'attractions.viewAll': '查看全部',
        'events.title': '旅游活动',
        'events.viewCalendar': '查看日历',
        'map.title': '旅游地图',
        'map.explore': '探索全部',
        'footer.rights': '版权所有',
        'footer.tourism': '南奔旅游',
      },
      jp: {
        'nav.home': 'ホーム',
        'nav.attractions': '観光スポット',
        'nav.events': 'イベントカレンダー',
        'nav.map': '地図',
        'hero.title': 'ランプーン',
        'hero.subtitle': '歴史と文化の街',
        'hero.explore': '観光スポットを探す',
        'attractions.title': '人気の観光スポット',
        'attractions.viewAll': 'すべて見る',
        'events.title': '観光イベント',
        'events.viewCalendar': 'カレンダーを見る',
        'map.title': '観光マップ',
        'map.explore': 'すべて探索',
        'footer.rights': '無断転載禁止',
        'footer.tourism': 'ランプーン観光',
      }
    };

    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
