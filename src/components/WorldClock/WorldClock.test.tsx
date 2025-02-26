import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WorldClock } from './WorldClock';
import { useLanguageStore } from '../../store/languageStore';

// Мок для zustand
jest.mock('../../store/languageStore', () => ({// Мокируем useLanguageStore
  useLanguageStore: jest.fn()// Возвращаем mock функции
}));

describe('Компонент WorldClock', () => {
  beforeEach(() => {
   
    jest.mocked(useLanguageStore).mockReturnValue({// Мокируем useLanguageStore
      language: 'RUS'// Возвращаем значение language
    });
  });

  it('отображает часы Москвы и Пекина', () => {
    render(<WorldClock />);
    

    expect(screen.getByText(/Москва/i)).toBeInTheDocument();// Проверяем, что текст "Москва" отображается
    expect(screen.getByText(/Пекин/i)).toBeInTheDocument();// Проверяем, что текст "Пекин" отображается
  });

  it('переводит названия городов при смене языка', () => {
    // Меняем язык на китайский
    jest.mocked(useLanguageStore).mockReturnValue({// Мокируем useLanguageStore
      language: 'CHI'// Возвращаем значение language
    });
    
    render(<WorldClock />);
    
    // Проверим правильные тексты для китайского языка
    expect(screen.getByText(/莫斯科/i, { exact: false })).toBeInTheDocument(); // Проверяем, что текст "Москва" отображается
    expect(screen.getByText(/北京/i, { exact: false })).toBeInTheDocument(); // Проверяем, что текст "Пекин" отображается
  });
}); 