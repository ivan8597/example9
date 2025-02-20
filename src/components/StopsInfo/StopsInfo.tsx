import { FC } from 'react';
import styles from './StopsInfo.module.scss';
import { useLanguageStore } from '../../store/languageStore';
import { translations } from '../../utils/translations';

interface StopsInfoProps {
  stopsCount: number;
}

export const StopsInfo: FC<StopsInfoProps> = ({ stopsCount }) => {
  const { language } = useLanguageStore();

  const getStopsText = (count: number) => {
    if (count === 0) return translations[language]['Без пересадок'];
    if (count === 1) return translations[language]['1 пересадка'];
    if (count === 2) return translations[language]['2 пересадки'];
    if (count === 3) return translations[language]['3 пересадки'];
    return `${count} пересадки`;
  };

  return (
    <div className={styles.stopsInfo}>
      <div className={styles.stopsLine}></div>
      <p className={styles.stops}>{getStopsText(stopsCount)}</p>
    </div>
  );
}; 