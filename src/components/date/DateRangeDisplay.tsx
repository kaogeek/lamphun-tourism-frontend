import { format } from 'date-fns';

type DateRangeDisplayProps = {
  startDate: string | Date;
  endDate: string | Date;
};

const DateRangeDisplay = ({ startDate, endDate }: DateRangeDisplayProps) => {
  if (!startDate || !endDate) return null;

  // TODO make format is global
  const startDateText = format(startDate, 'EEEE, d MMMM yyyy');
  const endDateText = format(endDate, 'EEEE, d MMMM yyyy');
  const sameDay = startDateText === endDateText;

  return <span>{sameDay ? startDateText : `${startDateText} - ${endDateText}`}</span>;
};

export default DateRangeDisplay;
