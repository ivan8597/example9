import { FC } from 'react';
import styles from './StopsInfo.module.scss';

interface StopsInfoProps {
  stopsCount: number;
}

export const StopsInfo: FC<StopsInfoProps> = ({ stopsCount }) => {
  const getStopsText = (count: number) => {
    if (count === 0) return 'Без пересадок';
    if (count === 1) return '1 пересадка';
    return `${count} пересадки`;
  };

  return (
    <div className={styles.stopsInfo}>
      <div className={styles.stopsLine}></div>
      <p className={styles.stops}>{getStopsText(stopsCount)}</p>
    </div>
  );
}; 