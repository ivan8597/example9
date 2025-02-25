import { FC } from 'react';
import styles from './FlightInfo.module.scss';
import moment from 'moment';

interface FlightInfoProps {
  time: string;
  city: string;
  cityName: string;
  date: string;
}

export const FlightInfo: FC<FlightInfoProps> = ({ time, city, cityName, date }) => {// комментарий 
  const formatDate = (dateString: string) => {
    return moment(dateString, "DD.MM.YY")
      .locale('ru')
      .format('D MMM YYYY, dddd');
  };

  return (
    <div className={styles.routeInfo}>
      <p className={styles.time}>{time}</p>
      <p className={styles.city}>{city}, {cityName}</p>
      <p className={styles.date}>{formatDate(date)}</p>
    </div>
  );
}; 