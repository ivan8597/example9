import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Ticket } from './ticket';
import { useCurrencyStore } from '../../../../store/currencyStore';
import { useLanguageStore } from '../../../../store/languageStore';

// Мок для хранилищ
jest.mock('../../../../store/currencyStore');
jest.mock('../../../../store/languageStore');
jest.mock('moment', () => () => ({ // Мокируем moment
  locale: () => ({// Возвращаем значение locale
    format: () => '10 дек 2023, понедельник'// Возвращаем значение format
  }),
  diff: () => 120// Возвращаем значение diff
}));

// Мок для localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};// Инициализация объекта store для хранения данных в виде ключ-значение
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

describe('Ticket', () => {
  const mockTicket = {
    origin: 'MOW',
    origin_name: 'Москва',
    destination: 'HKT',
    destination_name: 'Пхукет',
    departure_date: '10.12.23',
    departure_time: '10:45',
    arrival_date: '10.12.23',
    arrival_time: '12:45',
    carrier: 'S7',
    stops: 1,
    price: 15000
  };

  beforeEach(() => {
    jest.mocked(useCurrencyStore).mockReturnValue({// Мокируем useCurrencyStore
      currency: 'RUB'// Возвращаем значение currency
    });
    jest.mocked(useLanguageStore).mockReturnValue({// Мокируем useLanguageStore
      language: 'RUS'// Возвращаем значение language
    });
    localStorage.clear();// Очищаем localStorage
  });

  it('отображает информацию о билете', () => {
    render(<Ticket ticket={mockTicket} />);
    
    expect(screen.getByText('10:45')).toBeInTheDocument();  // Проверяем, что текст "10:45" отображается
    expect(screen.getByText('12:45')).toBeInTheDocument(); // Проверяем, что текст "12:45" отображается
    expect(screen.getByText(/Москва/)).toBeInTheDocument(); // Проверяем, что текст "Москва" отображается
    expect(screen.getByText(/Пхукет/)).toBeInTheDocument(); // Проверяем, что текст "Пхукет" отображается
    expect(screen.getByText(/15 000 ₽/)).toBeInTheDocument(); // Проверяем, что текст "15 000 ₽" отображается
  });

  it('конвертирует цену при смене валюты', () => {
    jest.mocked(useCurrencyStore).mockReturnValue({// Мокируем useCurrencyStore
      currency: 'USD'// Возвращаем значение currency
    });
    
    render(<Ticket ticket={mockTicket} />);
    // 15000 RUB / 90 = 167 USD
    expect(screen.getByText(/167 \$/)).toBeInTheDocument(); // Проверяем, что текст "167 $" отображается
  });

  it('сохраняет билет в локальное хранилище при нажатии кнопки покупки', () => {
    render(<Ticket ticket={mockTicket} />);// Рендерим компонент Ticket с mockTicket
    
    fireEvent.click(screen.getByText(/Купить за/));// Кликаем на кнопку "Купить за"
    
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');// Получаем данные из localStorage
    expect(savedTickets.length).toBe(1);// Проверяем, что длина массива savedTickets равна 1
    expect(savedTickets[0].price).toBe(15000);// Проверяем, что цена билета равна 15000
  });

  it('отображает модальное окно после покупки', () => {
    render(<Ticket ticket={mockTicket} />);// Рендерим компонент Ticket с mockTicket
    
    fireEvent.click(screen.getByText(/Купить за/));// Кликаем на кнопку "Купить за"
    
    expect(screen.getByText('Билет добавлен в заказы!')).toBeInTheDocument();// Проверяем, что текст "Билет добавлен в заказы!" отображается
  });
}); 