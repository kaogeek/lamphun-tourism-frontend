
// Define event and category types
export interface Event {
  id: string;
  name: {
    th: string;
    en: string;
    cn: string;
    jp: string;
  };
  date: string;
}

export interface EventCategory {
  id: string;
  name: {
    th: string;
    en: string;
    cn: string;
    jp: string;
  };
  color: string;
  textColor: string;
  image: string;
  events: Event[];
}
