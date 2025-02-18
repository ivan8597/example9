import { applyFilters } from "./applyFilters";
import { Filter } from "./components/filter";
import { Ticket } from "./components/ticket";
import { Checkbox } from "../../checkbox/checkbox";
import { Change } from "../../utilities/consts";
import styles from "./filters.module.scss";
import { useCurrencyStore } from '../../store/currencyStore';
import { Currency, RATES } from '../../utils/currency';

export const PageFilters = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const {
    isValues,
    tickets,
    selectedFilters,
    handleOnAllClick,
    handleOnClick,
    handleFilter,
  } = applyFilters();

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <span className={styles.title}>ВАЛЮТА</span>
        <div className={styles.currencies}>
          {(Object.keys(RATES) as Currency[]).map((curr) => (
            <div
              key={curr}
              className={`${styles.currency} ${curr === currency ? styles.selected : ""}`}
              onClick={() => setCurrency(curr)}
              role="button"
            >
              {curr}
            </div>
          ))}
        </div>
        <span className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <Checkbox
          onClick={handleOnAllClick}
          isChecked={isValues}
          id="values"
          label={"Все"}
        />
        { Change.map((filter) => (
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
