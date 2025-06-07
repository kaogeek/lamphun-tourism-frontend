import { describe, it, expect } from 'vitest';
import { getTranslateWithFallback } from './i18n';

type LocalizedItem = {
  locale: string;
  localizations: LocalizedItem[];
  name: string;
};

describe('getTranslateWithFallback', () => {
  const item: LocalizedItem = {
    locale: 'en',
    localizations: [
      { locale: 'en', localizations: [], name: 'English Item' },
      { locale: 'fr', localizations: [], name: 'French Item' },
      { locale: 'es', localizations: [], name: 'Spanish Item' },
    ],
    name: 'English Item',
  };

  it('should return the target localization if it exists', () => {
    const result = getTranslateWithFallback(item, 'fr');
    expect(result.locale).toBe('fr');
    expect(result.name).toBe('French Item');
  });

  it('should return the original item if the target localization does not exist', () => {
    const result = getTranslateWithFallback(item, 'de');
    expect(result.locale).toBe('en');
    expect(result.name).toBe('English Item');
  });

  it('should return the original item if the locale matches the item locale', () => {
    const result = getTranslateWithFallback(item, 'en');
    expect(result.locale).toBe('en');
    expect(result.name).toBe('English Item');
  });

  it('should return the original item if there are no localizations', () => {
    const itemWithoutLocalizations: LocalizedItem = {
      locale: 'en',
      localizations: [],
      name: 'English Item',
    };
    const result = getTranslateWithFallback(itemWithoutLocalizations, 'fr');
    expect(result.locale).toBe('en');
    expect(result.name).toBe('English Item');
  });

  it('should handle an empty item gracefully', () => {
    const emptyItem: LocalizedItem = {
      locale: '',
      localizations: [],
      name: '',
    };
    const result = getTranslateWithFallback(emptyItem, 'fr');
    expect(result.locale).toBe('');
    expect(result.name).toBe('');
  });
});
