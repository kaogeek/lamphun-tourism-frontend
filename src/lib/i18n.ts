type LocalizedEntity<T> = {
  locale: string;
  localizations: T[];
};

export function getTranslateWithFallback<T extends LocalizedEntity<T>>(
  item: T,
  locale: string,
  forceUseFields: (keyof T)[] = []
): T {
  const localizations = item.localizations ?? [];
  const targetLocale = localizations.find((localization) => localization.locale === locale);

  if (!targetLocale) {
    return item;
  }

  const fallbackFields = forceUseFields.reduce((acc, key) => {
    acc[key] = item[key];
    return acc;
  }, {} as Partial<T>);

  return {
    ...targetLocale,
    ...fallbackFields,
    localizations: localizations,
  };
}
