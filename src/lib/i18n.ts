export function getTranslateWithFallback<T extends { locale: string; localizations: T[] }>(item: T, locale: string): T {
  const localizations = item.localizations;
  const targetLocale = localizations.find((localization) => localization.locale === locale);

  if (!targetLocale) {
    return item;
  }

  return targetLocale;
}
