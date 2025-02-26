import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeChecked(): R;
      toHaveTextContent(text: string): R;
      // добавьте другие матчеры по необходимости
    }
  }
} 