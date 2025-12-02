export interface GuideLocation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imagePlaceholder: string;
  details?: { label: string; value: string }[];
}

export interface ItineraryItem {
  time: string;
  title: string;
  type: 'transport' | 'hotel' | 'food' | 'activity' | 'info';
  description?: string;
  locationLink?: string;
  mapCode?: string;
  highlight?: boolean;
  guideId?: string;
}

export interface ItineraryDay {
  date: string;
  dayOfWeek: string;
  title: string;
  items: ItineraryItem[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MemoItem {
  id: string;
  content: string;
  timestamp: number;
}

export interface ExpenseItem {
  id: string;
  description: string;
  amountJPY: number;
  date: number;
  receiptImageBase64?: string;
}

export interface WeatherData {
  date: string; // YYYY-MM-DD
  code: string;
  text: string;
  pop: string; // Probability of Precipitation
  minTemp: string;
  maxTemp: string;
}
