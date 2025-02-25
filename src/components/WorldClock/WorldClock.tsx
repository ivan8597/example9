import React, { useState, useEffect } from 'react';
import styles from './WorldClock.module.scss';
import { useLanguageStore } from '../../store/languageStore';
import { translations } from '../../utils/translations';
import { motion } from 'framer-motion';

interface ClockProps {
  timeZone: string;
  city: string;
}

const AnalogClock: React.FC<ClockProps> = ({ timeZone, city }) => {
  const [date, setDate] = useState(new Date());
  const { language } = useLanguageStore();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const hours = date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false, timeZone }).split(':')[0];
  const minutes = date.toLocaleTimeString('en-US', { minute: '2-digit', timeZone }).split(':')[0];
  const seconds = date.toLocaleTimeString('en-US', { second: '2-digit', timeZone }).split(':')[0];
  
  const hoursRotation = parseInt(hours) * 30 + parseInt(minutes) * 0.5;
  const minutesRotation = parseInt(minutes) * 6;
  const secondsRotation = parseInt(seconds) * 6;
  
  const cityName = language === 'CHI' && city in translations[language] 
    ? translations[language][city as keyof typeof translations[typeof language]] 
    : city;
  
  return (
    <motion.div 
      className={styles.clock}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className={styles.cityName}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {cityName}
      </motion.div>
      <div className={styles.clockFace}>
        <motion.div 
          className={styles.hour} 
          style={{ rotate: hoursRotation }}
          transition={{ type: "tween", ease: "linear" }}
        />
        <motion.div 
          className={styles.minute} 
          style={{ rotate: minutesRotation }}
          transition={{ type: "tween", ease: "linear" }}
        />
        <motion.div 
          className={styles.second} 
          style={{ rotate: secondsRotation }}
          transition={{ type: "tween", ease: "linear" }}
        />
        <motion.div 
          className={styles.center}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        {[...Array(12)].map((_, i) => (
          <motion.span 
            key={i} 
            className={styles.number} 
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-120px) rotate(-${i * 30}deg)` 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            {i === 0 ? 12 : i}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const WorldClock: React.FC = () => {
  return (
    <motion.div 
      className={styles.clockContainer}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AnalogClock timeZone="Europe/Moscow" city="Москва" />
      <AnalogClock timeZone="Asia/Shanghai" city="Пекин" />
    </motion.div>
  );
}; 