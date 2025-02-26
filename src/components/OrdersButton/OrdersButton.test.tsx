import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrdersButton } from './OrdersButton';
import { useLanguageStore } from '../../store/languageStore';
import { useCurrencyStore } from '../../store/currencyStore';

jest.mock('../../store/languageStore');
jest.mock('../../store/currencyStore');

// Мок для localStorage
const mockSavedTickets = [
  {
    id: 1,
    carrier: 'S7',
    price: 15000,
    date: '2023-12-10T12:00:00.000Z',
    segments: [{
      origin: 'MOW',
      origin_name: 'Москва',
      destination: 'HKT',
      destination_name: 'Пхукет',
      departure_time: '10:45',
      departure_date: '10.12.23',
      arrival_time: '12:45',
      arrival_date: '10.12.23',
      stops: ['Пересадка 1'],
      duration: 120
    }]
  }
];

const localStorageMock = (() => {
  let store: Record<string, string> = {// Инициализация объекта store для хранения данных в виде ключ-значение
    'tickets': JSON.stringify(mockSavedTickets)// Сохраняем данные в виде строки
  };
  return {
    getItem: (key: string) => store[key] || null,// Получаем данные из store по ключу
    setItem: (key: string, value: string) => {// Сохраняем данные в store по ключу
      store[key] = value.toString();// Преобразуем значение в строку
    },
    clear: () => {// Очищаем store
      store = {};// Обновляем store
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });// Заменяем стандартный localStorage на mock

describe('Компонент OrdersButton', () => {
  beforeEach(() => {
    jest.mocked(useLanguageStore).mockReturnValue({// Мокируем useLanguageStore
      language: 'RUS'// Возвращаем значение language
    });
    jest.mocked(useCurrencyStore).mockReturnValue({// Мокируем useCurrencyStore
      currency: 'RUB'// Возвращаем значение currency
    });
  });

  it('отображает кнопку для просмотра заказов', () => {
    render(<OrdersButton />);
    
    expect(screen.getByText('Посмотреть заказы')).toBeInTheDocument();// Проверяем, что кнопка "Посмотреть заказы" отображается
  });

  it('открывает модальное окно при клике на кнопку', () => {
    render(<OrdersButton />);
    
    fireEvent.click(screen.getByText('Посмотреть заказы'));// Кликаем на кнопку "Посмотреть заказы"
    
    expect(screen.getByText('Ваши заказы')).toBeInTheDocument();// Проверяем, что текст "Ваши заказы" отображается
  });

  it('отображает сохраненные билеты в модальном окне', () => {
    render(<OrdersButton />);
    
    fireEvent.click(screen.getByText('Посмотреть заказы'));// Кликаем на кнопку "Посмотреть заказы"
    
    expect(screen.getByText(/MOW, Москва/i)).toBeInTheDocument();// Проверяем, что текст "MOW, Москва" отображается
    expect(screen.getByText(/HKT, Пхукет/i)).toBeInTheDocument();// Проверяем, что текст "HKT, Пхукет" отображается
    expect(screen.getByText(/15 000/)).toBeInTheDocument();// Проверяем, что текст "15 000" отображается
  });

  it('очищает заказы при нажатии на кнопку очистки', () => {
    render(<OrdersButton />);
    
    fireEvent.click(screen.getByText('Посмотреть заказы'));// Кликаем на кнопку "Посмотреть заказы"
    fireEvent.click(screen.getByText('Очистить заказы'));// Кликаем на кнопку "Очистить заказы"
    
    // Проверяем, что localStorage был очищен
    expect(JSON.parse(localStorage.getItem('tickets') || '[]')).toEqual([]);// Проверяем, что localStorage был очищен
  });
}); 