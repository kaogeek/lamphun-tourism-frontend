
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/placeholder.svg" 
            alt="Lamphun Logo" 
            className="h-10 w-10 mr-2"
          />
          <span className={cn(
            'font-bold text-lg transition-colors',
            isScrolled ? 'text-primary' : 'text-white'
          )}>
            Lamphun Tourism
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={cn(
            'font-medium transition-colors',
            isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
          )}>
            {t('nav.home')}
          </Link>
          <Link to="/attractions" className={cn(
            'font-medium transition-colors',
            isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
          )}>
            {t('nav.attractions')}
          </Link>
          <Link to="/events" className={cn(
            'font-medium transition-colors',
            isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
          )}>
            {t('nav.events')}
          </Link>
          <Link to="/map" className={cn(
            'font-medium transition-colors',
            isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
          )}>
            {t('nav.map')}
          </Link>
          <LanguageSwitcher />
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center">
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'ml-2',
              isScrolled ? 'text-gray-700' : 'text-white'
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
              className="font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/attractions" 
              className="font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.attractions')}
            </Link>
            <Link 
              to="/events" 
              className="font-medium text-gray-700 hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.events')}
            </Link>
            <Link 
              to="/map" 
              className="font-medium text-gray-700 hover:text-primary py-2"
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
