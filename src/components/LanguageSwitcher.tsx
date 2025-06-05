import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'cn', name: '中文', flag: '🇨🇳' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' },
];

const LanguageSwitcher: React.FC<{ isScrolled?: boolean }> = ({ isScrolled }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Find the current language data
  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Determine text color based on scroll position and page
  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-700';

  const onLanguageOptionChange = (langCode: string) => {
    i18n.changeLanguage(langCode).catch((error) => {
      console.error('Error changing language:', error);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn('flex items-center gap-1', textColor)}>
          <span className="mr-1">{currentLang.flag}</span>
          <span className="hidden md:inline">{currentLang.name}</span>
          <Globe className="h-4 w-4 md:ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageOptionChange(lang.code)}
            className={`flex items-center ${i18n.language === lang.code ? 'bg-primary/10 font-medium' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
            {i18n.language === lang.code && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
