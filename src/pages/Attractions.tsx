import AttractionGrid from '@/components/atrractions/AttractionGrid';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { useGetPlaceCategories } from '@/hooks/api/useGetPlaceCategories';
import { getTranslateWithFallback } from '@/lib/i18n';
import { t } from 'i18next';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

const CategorySelect = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { data } = useGetPlaceCategories({
    populate: {
      localizations: true,
    },
  });

  const items = data?.data ?? [];

  return (
    <select
      className="w-full h-10 px-3 border border-input bg-background rounded-md"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value={''}>{t('common.label.all')}</option>
      {items
        .map((category) => getTranslateWithFallback(category, language))
        .map((category, index) => (
          <option key={index} value={category.documentId}>
            {category.name}
          </option>
        ))}
    </select>
  );
};

const Attractions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20 pb-10 bg-primary/5">
        <div className="container mt-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('nav.attractions')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">{t('attractions.exploreLamphunDescription')}</p>

          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t('events.placeHolders.searchTerm')}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attractions List */}
      <section className="py-16">
        <div className="container">
          <AttractionGrid search={debouncedSearchTerm} selectedCategory={selectedCategory}></AttractionGrid>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Attractions;
