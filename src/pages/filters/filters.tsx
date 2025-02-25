import  { useCallback, useMemo } from 'react';
import { applyFilters } from "./applyFilters";
import { Filter } from "./components/filter";
import { Ticket } from "./components/ticket";
import { Checkbox } from "../../checkbox/checkbox";
import { Change } from "../../utilities/consts";
import styles from "./filters.module.scss";
import { useCurrencyStore } from '../../store/currencyStore';
import { Currency, RATES } from '../../utils/currency';
import { useLanguageStore } from '../../store/languageStore';
import { translations } from '../../utils/translations';
import { TranslationKey } from '../../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';


export const PageFilters = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const { language, setLanguage } = useLanguageStore();
  const {
    isValues,
    tickets,
    selectedFilters,
    handleOnAllClick,
    handleOnClick,
    handleFilter,
  } = applyFilters();

  const t = useCallback((key: TranslationKey) => {
    return translations[language][key];// комментарий
  }, [language]);

  const getTranslatedFilters = useMemo(() => {
    return Change.map(filter => ({
      ...filter,
      name: translations[language][filter.label],
      label: translations[language][filter.label]
    }));
  }, [language]);

  const currencyButtons = useMemo(() => (
    (Object.keys(RATES) as Currency[]).map((curr) => (
      <div
        key={curr}
        className={`${styles.currency} ${curr === currency ? styles.selected : ""}`}
        onClick={() => setCurrency(curr)}
        role="button"
      >
        {curr}
      </div>
    ))
  ), [currency, setCurrency]);

  return (
    <div className={styles.container}>
      <div className={styles.languageSwitch}>
        <motion.button 
          className={`${styles.langBtn} ${language === 'RUS' ? styles.active : ''}`}
          onClick={() => setLanguage('RUS')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RUS
        </motion.button>
        <motion.button 
          className={`${styles.langBtn} ${language === 'CHI' ? styles.active : ''}`}
          onClick={() => setLanguage('CHI')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CHI
        </motion.button>
      </div>
      <motion.div 
        className={styles.filters}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.title}>{t('ВАЛЮТА')}</span>
        <div className={styles.currencies}>
          {currencyButtons}
        </div>
        <span className={styles.title}>{t('КОЛИЧЕСТВО ПЕРЕСАДОК')}</span>
        <Checkbox
          onClick={handleOnAllClick}
          isChecked={isValues}
          id="values"
          label={t('Все')}
        />
        {getTranslatedFilters.map((filter) => (
          <Filter
            key={filter.id}
            handleFilter={handleFilter}
            selectedFilters={selectedFilters}
            filter={filter}
            handleOnClick={handleOnClick}
          />
        ))}
      </motion.div>
      <motion.div 
        className={styles.tickets}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <AnimatePresence>
          {tickets?.map((val, id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: id * 0.1 }}
            >
              <Ticket ticket={val} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
