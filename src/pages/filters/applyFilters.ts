import { useState, useEffect } from "react";
import { allData } from "../../data/tickets";
import { Data } from "../../types";

export const applyFilters = () => {
  const [isValues, setisValues] = useState<boolean>(true);
  const [tickets, setTickets] = useState<Data[]>();
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const handleOnClick = (id: number) => {
    setSelectedFilters([id]);
    setisValues(false);
  };

  const handleOnAllClick = () => {
    setisValues(true);
    setSelectedFilters([]);
    setTickets(allData.tickets);
  };

  const handleFilter = (id: number) => {
    const tempArray = selectedFilters;
    const index = tempArray.indexOf(id);
    if (index !== -1) {
      tempArray.splice(index, 1);
    } else {
      tempArray.push(id);
    }
    setisValues(false);
    setSelectedFilters([...tempArray]);
  };

  const getFilteredData = (filters: number[]) => {
    const temp = allData?.tickets?.filter((ticket) =>
      filters.includes(ticket.stops)
    );
    setTickets(temp);
  };

  useEffect(() => {
    setTickets(allData.tickets.sort((a, b) => a.price - b.price));
  }, []);

  useEffect(() => {
    if (!isValues) {
      if (selectedFilters.length) {
        getFilteredData(selectedFilters);
      } else {
        setisValues(true);
        setTickets(allData.tickets);
      }
    }
  }, [selectedFilters, isValues]);

  return {
    tickets,
    isValues,
    selectedFilters,
    handleOnAllClick,
    handleOnClick,
    handleFilter,
  };
};
