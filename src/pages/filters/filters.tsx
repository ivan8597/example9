import React, { useCallback, useMemo } from 'react';
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
    return translations[language][key];
  }, [language]);

  const getTranslatedFilters = useMemo(() => {
    return Change.map(filter => ({
      ...filter,
      name: translations[language][filter.label],
      label: translations[language][filter.label]
    }));
  }, [language]);

  const handleLanguageChange = useCallback((newLang: 'RUS' | 'CHI') => {
    setLanguage(newLang);
  }, []);

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
        <button 
          className={`${styles.langBtn} ${language === 'RUS' ? styles.active : ''}`}
          onClick={() => setLanguage('RUS')}
        >
          RUS
        </button>
        <button 
          className={`${styles.langBtn} ${language === 'CHI' ? styles.active : ''}`}
          onClick={() => setLanguage('CHI')}
        >
          CHI
        </button>
      </div>
      <div className={styles.filters}>
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
      </div>
      <div className={styles.tickets}>
        {tickets?.map((val, id) => (
          <Ticket key={id} ticket={val} />
        ))}
      </div>
    </div>
  );
};
