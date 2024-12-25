// import { FC, ReactNode, MouseEvent } from "react";

export type FilterProps = {
  filter: {
    id: number;
    name: string;
  };
  selectedFilters: number[];
  handleFilter: (id: number) => void;
  handleOnClick: (id: number) => void;
};

export type TicketProps = {
  ticket: {
    destination: string;
    arrival_time: string;
    price: number;
    departure_time: string;
    carrier: string;
    origin: string;
    origin_name: string;
    departure_date: string;
    stops: number;
    destination_name: string;
    arrival_date: string;
  };
};

export type CheckboxProps = {
  id: string;
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
  isChecked?: boolean;
  onMouseLeave?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (ev: React.MouseEvent<HTMLDivElement>) => void;
};

export type Data = {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
};
