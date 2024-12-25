import { FC, MouseEvent, useState } from "react";
import { Checkbox } from "../../../../checkbox";
import { FilterProps } from "../../../../types";

export const Filter: FC<FilterProps> = ({
  handleFilter,
  selectedFilters,
  filter,
  handleOnClick,
}) => {
  const [isButtonVisible, setButtonVisibility] = useState<string>("displayisnot");
  const showButtonn = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setButtonVisibility("displayview");
  };

  const hideButton = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setButtonVisibility("displayisnot");
  };

  return (
    <>
      <Checkbox
        id={`${filter.id}`}
        isChecked={selectedFilters.includes(filter.id)}
        label={filter.name}
        onClick={() => handleFilter(filter.id)}
        onMouseEnter={showButtonn}
        onMouseLeave={hideButton}
      >
        <div
          className={isButtonVisible}
          onClick={(ev) => {
            ev.stopPropagation();
            handleOnClick(filter.id);
          }}
        >
          ТОЛЬКО
        </div>
      </Checkbox>
    </>
  );
};
