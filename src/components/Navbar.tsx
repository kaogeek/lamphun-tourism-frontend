import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar style based on page and scroll position
  const getNavbarStyle = () => {
    // On homepage with transparent navbar (not scrolled)
    if (isHomePage && !isScrolled) {
      return {
        bg: 'bg-transparent',
        textColor: 'text-white',
        hoverColor: 'hover:text-gray-200',
        shadow: ''
      };
    }
    
    // On homepage but scrolled down
    if (isHomePage && isScrolled) {
      return {
        bg: 'bg-white',
        textColor: 'text-gray-700',
        hoverColor: 'hover:text-primary',
        shadow: 'shadow-md'
      };
    }
    
    // On other pages (always solid background)
    return {
      bg: 'bg-white',
      textColor: 'text-gray-700',
      hoverColor: 'hover:text-primary',
      shadow: 'shadow-md'
    };
  };

  const navStyle = getNavbarStyle();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        navStyle.bg,
        navStyle.shadow,
        'py-3'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/logo-ci-blue.png" 
            alt="Lamphun Logo" 
            className="h-10 w-10 mr-2"
          />
          <span className={cn(
            'font-bold text-lg transition-colors',
            isScrolled || !isHomePage ? 'text-primary' : 'text-white'
          )}>
            {language === 'th' ? 'ท่องเที่ยวลำพูน'
              : language === 'en' ? 'Lamphun Tourism'
              : language === 'cn' ? '南奔旅游网'
              : 'ランプーン観光サイト'}
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={cn(
            'font-medium transition-colors',
            navStyle.textColor,
            navStyle.hoverColor,
            location.pathname === '/' ? 'border-b-2 border-primary' : ''
          )}>
            {t('nav.home')}
          </Link>
          <Link to="/attractions" className={cn(
            'font-medium transition-colors',
            navStyle.textColor,
            navStyle.hoverColor,
            location.pathname === '/attractions' ? 'border-b-2 border-primary' : ''
          )}>
            {t('nav.attractions')}
          </Link>
          <Link to="/events" className={cn(
            'font-medium transition-colors',
            navStyle.textColor,
            navStyle.hoverColor,
            location.pathname === '/events' ? 'border-b-2 border-primary' : ''
          )}>
            {t('nav.events')}
          </Link>
          <Link to="/map" className={cn(
            'font-medium transition-colors',
            navStyle.textColor,
            navStyle.hoverColor,
            location.pathname === '/map' ? 'border-b-2 border-primary' : ''
          )}>
            {t('nav.map')}
          </Link>
          <LanguageSwitcher isScrolled={isScrolled} />
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center">
          <LanguageSwitcher isScrolled={isScrolled} />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'ml-2',
              isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
            )}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-primary py-2 border-l-4 border-transparent hover:border-primary pl-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/attractions" 
              className="font-medium text-gray-700 hover:text-primary py-2 border-l-4 border-transparent hover:border-primary pl-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.attractions')}
            </Link>
            <Link 
              to="/events" 
              className="font-medium text-gray-700 hover:text-primary py-2 border-l-4 border-transparent hover:border-primary pl-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.events')}
            </Link>
            <Link 
              to="/map" 
              className="font-medium text-gray-700 hover:text-primary py-2 border-l-4 border-transparent hover:border-primary pl-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.map')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
