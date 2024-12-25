import { applyFilters } from "./applyFilters";
import { Filter } from "./components/filter";
import { Ticket } from "./components/ticket";
import { Checkbox } from "../../checkbox/checkbox";
import { Curriencies, Change } from "../../utilities/consts";
import styles from "./filters.module.scss";

export const PageFilters = () => {//страница для отрисоки компонентов 
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
          { Curriencies.map((val, id) => (
            <div
            key={id}
            className={`${styles.currency} ${val=== "RUB" ? styles.selected : ""}`}
          >
            {val}
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
