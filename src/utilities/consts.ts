import { Filter } from '../types/filter';


export const Change: Filter[] = [
  { id: 1, name: "Без пересадок", label: "Без пересадок" },
  { id: 2, name: "1 пересадка", label: "1 пересадка" },
  { id: 3, name: "2 пересадки", label: "2 пересадки" },
  { id: 4, name: "3 пересадки", label: "3 пересадки" }
] as const;
export const Curriencies = ["RUB", "USD", "EUR"];
