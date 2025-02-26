import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { PageFilters } from "./filters";
import { useCurrencyStore } from "../../store/currencyStore";
import { useLanguageStore } from "../../store/languageStore";
import * as ApplyFilters from "./applyFilters";

jest.mock("../../store/currencyStore");// Мокируем useCurrencyStore
jest.mock("../../store/languageStore");// Мокируем useLanguageStore
jest.mock("./applyFilters");// Мокируем applyFilters

describe("Компонент PageFilters", () => {
  const mockFilterHooks = {
    isValues: true,
    tickets: [
      {
        origin: "MOW",
        origin_name: "Москва",
        destination: "HKT",
        destination_name: "Пхукет",
        departure_date: "10.12.23",
        departure_time: "10:45",
        arrival_date: "10.12.23",
        arrival_time: "12:45",
        carrier: "S7",
        stops: 1,
        price: 15000,
      },
    ],// Массив билетов
    selectedFilters: [1, 2],// Массив выбранных фильтров
    handleOnAllClick: jest.fn(),// Мокируем handleOnAllClick
    handleOnClick: jest.fn(),// Мокируем handleOnClick
    handleFilter: jest.fn(),// Мокируем handleFilter
  };

  const mockSetCurrency = jest.fn();// Мокируем mockSetCurrency
  const mockSetLanguage = jest.fn();// Мокируем mockSetLanguage

  beforeEach(() => {
    jest.spyOn(ApplyFilters, "applyFilters").mockReturnValue(mockFilterHooks);// Мокируем applyFilters

    jest.mocked(useCurrencyStore).mockReturnValue({// Мокируем useCurrencyStore
      currency: "RUB",// Возвращаем значение currency
      setCurrency: mockSetCurrency,// Возвращаем значение setCurrency
    });

    jest.mocked(useLanguageStore).mockReturnValue({// Мокируем useLanguageStore
      language: "RUS",// Возвращаем значение language
      setLanguage: mockSetLanguage,// Возвращаем значение setLanguage
    });
  });

  it("отображает фильтры и билеты", () => {
    render(<PageFilters />);

    expect(screen.getByText("ВАЛЮТА")).toBeInTheDocument();// Проверяем, что текст "ВАЛЮТА" отображается
    expect(screen.getByText("КОЛИЧЕСТВО ПЕРЕСАДОК")).toBeInTheDocument();// Проверяем, что текст "КОЛИЧЕСТВО ПЕРЕСАДОК" отображается
    expect(screen.getByText("Все")).toBeInTheDocument();// Проверяем, что текст "Все" отображается
    expect(screen.getByText("Без пересадок")).toBeInTheDocument();// Проверяем, что текст "Без пересадок" отображается
  });

  it("переключает валюту при клике на кнопку валюты", () => {
    render(<PageFilters />);

    fireEvent.click(screen.getByText("USD"));// Кликаем на кнопку "USD"

    expect(mockSetCurrency).toHaveBeenCalledWith("USD");// Проверяем, что mockSetCurrency был вызван с "USD"
  });

  it("переключает язык при клике на кнопку языка", () => {
    render(<PageFilters />);

    fireEvent.click(screen.getByText("CHI"));// Кликаем на кнопку "CHI"

    expect(mockSetLanguage).toHaveBeenCalledWith("CHI");// Проверяем, что mockSetLanguage был вызван с "CHI"
  });

  it("вызывает обработчик при клике на чекбокс фильтра", () => {
    render(<PageFilters />);

    fireEvent.click(screen.getByText("Все"));// Кликаем на кнопку "Все"
    
    expect(mockFilterHooks.handleOnAllClick).toHaveBeenCalled();// Проверяем, что mockFilterHooks.handleOnAllClick был вызван
  });

  it("отображает переведенные фильтры при смене языка", () => {
    jest.mocked(useLanguageStore).mockReturnValue({// Мокируем useLanguageStore
      language: "CHI",// Возвращаем значение language
      setLanguage: mockSetLanguage,// Возвращаем значение setLanguage
    });

    render(<PageFilters />);

    expect(screen.getByText("货币")).toBeInTheDocument();// Проверяем, что текст "货币" отображается
    expect(screen.getByText("中转站")).toBeInTheDocument();// Проверяем, что текст "中转站" отображается
  });
});
