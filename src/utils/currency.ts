export const RATES = {
  USD: 90,  // 1 USD = 90 RUB
  EUR: 98,  // 1 EUR = 98 RUB
  RUB: 1
} as const;

export const SYMBOLS = {
  RUB: '₽',
  USD: '$',
  EUR: '€'
} as const;

export type Currency = keyof typeof RATES;

export const convertPrice = (priceInRub: number, targetCurrency: Currency) => {
  if (targetCurrency === 'RUB') return priceInRub;
  return Math.round(priceInRub / RATES[targetCurrency]);
}; 