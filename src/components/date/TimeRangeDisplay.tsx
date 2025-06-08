import { format, parse } from 'date-fns';

type TimeRangeDisplayProps = {
  startTime: string | Date;
  endTime: string | Date;
};

const TimeRangeDisplay = ({ startTime, endTime }: TimeRangeDisplayProps) => {
  if (!startTime || !endTime) return null;

  // TODO make format is global
  const start = typeof startTime === 'string' ? parse(startTime, 'HH:mm:ss', new Date()) : startTime;
  const end = typeof endTime === 'string' ? parse(endTime, 'HH:mm:ss', new Date()) : endTime;

  const startText = format(start, 'HH:mm');
  const endText = format(end, 'HH:mm');
  const sameTime = startText === endText;

  return <span>{sameTime ? startText : `${startText} - ${endText}`}</span>;
};

export default TimeRangeDisplay;
