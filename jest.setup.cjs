const React = require('react');
require('@testing-library/jest-dom/extend-expect');

// Моки для работы с анимацией framer-motion
jest.mock('framer-motion', () => {
  // Список пропсов от Framer Motion, которые нужно фильтровать
  const motionProps = [
    'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
    'animate', 'initial', 'variants', 'transition', 'exit', 'layoutId', 
    'layout', 'layoutDependency'
  ];
  
  // Функция для фильтрации пропсов
  const filterMotionProps = (props) => {
    const filteredProps = {};
    Object.keys(props).forEach(key => {
      if (!motionProps.includes(key)) {
        filteredProps[key] = props[key];
      }
    });
    return filteredProps;
  };
  
  return {
    motion: {
      div: ({ children, ...props }) => React.createElement('div', filterMotionProps(props), children),
      button: ({ children, ...props }) => React.createElement('button', filterMotionProps(props), children),
      span: ({ children, ...props }) => React.createElement('span', filterMotionProps(props), children),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

// Макет для дат
jest.mock('moment', () => {
  const mockMoment = jest.fn(() => ({
    locale: jest.fn().mockReturnThis(),
    format: jest.fn().mockReturnValue('10 дек 2023, понедельник'),
    diff: jest.fn().mockReturnValue(120)
  }));
  return mockMoment;
});

// Глобальные моки для браузерного API
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 