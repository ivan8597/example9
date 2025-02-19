export interface SavedTicket {
  id: number;
  carrier: string;
  price: number;
  date: string;
  segments: Segment[];
}

export interface Segment {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_time: string;
  departure_date: string;
  arrival_time: string;
  arrival_date: string;
  stops: string[];
} 