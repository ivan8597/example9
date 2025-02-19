import { FC } from 'react';
import styles from './PriceDisplay.module.scss';
import { useCurrencyStore } from '../../store/currencyStore';
import { SYMBOLS, convertPrice } from '../../utils/currency';
import { formatNumberWithSpaces } from '../../utils';

interface PriceDisplayProps {
  price: number;
}

export const PriceDisplay: FC<PriceDisplayProps> = ({ price }) => {
  const { currency } = useCurrencyStore();

  return (
    <p className={styles.price}>
      {formatNumberWithSpaces(convertPrice(price, currency))} {SYMBOLS[currency]}
    </p>
  );
}; 