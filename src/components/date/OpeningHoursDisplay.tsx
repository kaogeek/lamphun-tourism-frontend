type OpeningHour = {
  open: string;
  close: string;
  enabled: boolean;
};

type OpeningHoursDisplayProps = {
  openingHours?: Record<string, OpeningHour>;
};

const OpeningHoursDisplay = ({ openingHours }: OpeningHoursDisplayProps) => {
  if (!openingHours) {
    return <p className="text-gray-600">No opening hours available</p>;
  }

  return (
    <div className="text-gray-600">
      {Object.entries(openingHours).map(([day, hours]) => (
        <div key={day}>
          <p>
            {day}: {hours.enabled ? `${hours.open} - ${hours.close}` : 'Closed'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OpeningHoursDisplay;
