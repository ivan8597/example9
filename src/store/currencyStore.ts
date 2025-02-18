import { create } from 'zustand';
import { Currency } from '../utils/currency';

interface CurrencyStore {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currency: 'RUB',
  setCurrency: (currency) => set({ currency }),
})); 