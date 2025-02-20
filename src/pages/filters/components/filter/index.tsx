import React, { FC } from 'react';
import { Filter as FilterType } from '../../../../types/filter';
import { Checkbox } from '../../../../checkbox/checkbox';
import { useLanguageStore } from '../../../../store/languageStore';
import { translations } from '../../../../utils/translations';

interface FilterProps {
  filter: FilterType;
  selectedFilters: string[];
  handleFilter: (name: string) => void;
  handleOnClick: (id: number) => void;
}

export const Filter: FC<FilterProps> = ({ filter, selectedFilters, handleFilter, handleOnClick }) => {
  const { language } = useLanguageStore();

  return (
    <Checkbox
      onClick={() => handleOnClick(filter.id)}
      isChecked={selectedFilters.includes(filter.name)}
      id={String(filter.id)}
      label={filter.label}
    />
  );
}; 