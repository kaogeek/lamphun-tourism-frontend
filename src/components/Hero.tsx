import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/lovable-uploads/hero.webp" alt="Lamphun Landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">{t('hero.title')}</h1>
        <h2 className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t('hero.subtitle')}
        </h2>
        <Link to="/attractions">
          <Button
            className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 rounded-full animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {t('hero.explore')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero;
