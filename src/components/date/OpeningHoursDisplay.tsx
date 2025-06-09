import { useTranslation } from 'react-i18next';

type OpeningHour = {
  open: string;
  close: string;
  enabled: boolean;
};

type OpeningHoursDisplayProps = {
  openingHours?: Record<string, OpeningHour>; // e.g., { monday: { open, close, enabled } }
};

const OpeningHoursDisplay = ({ openingHours }: OpeningHoursDisplayProps) => {
  const { t } = useTranslation();

  if (!openingHours) {
    return <p className="text-gray-600">{t('openingHours.empty')}</p>;
  }

  return (
    <div className="text-gray-600">
      {Object.entries(openingHours).map(([day, hours]) => (
        <div key={day}>
          <p>
            {t(`common.days.${day}`)}: {hours.enabled ? `${hours.open} - ${hours.close}` : t('openingHours.closed')}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OpeningHoursDisplay;
