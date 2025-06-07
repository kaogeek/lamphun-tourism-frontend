type LocalizedEntity<T> = {
  locale: string;
  localizations: T[];
};

export function getTranslateWithFallback<T extends LocalizedEntity<T>>(item: T, locale: string): T {
  const localizations = item.localizations;
  const targetLocale = localizations.find((localization) => localization.locale === locale);

  if (!targetLocale) {
    return item;
  }

  return targetLocale;
}
