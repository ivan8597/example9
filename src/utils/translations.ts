export type TranslationKey = 
  | 'ВАЛЮТА'
  | 'КОЛИЧЕСТВО ПЕРЕСАДОК'
  | 'Все'
  | 'Без пересадок'
  | '1 пересадка'
  | '2 пересадки'
  | '3 пересадки'
  | 'Посмотреть заказы'
  | 'Ваши заказы'
  | 'Очистить заказы'
  | 'Купить за'
  | 'Ларнака'
  | 'Тель-Авив'
  | 'Владивосток';

export const translations = {
  'RUS': {
    'ВАЛЮТА': 'ВАЛЮТА',
    'КОЛИЧЕСТВО ПЕРЕСАДОК': 'КОЛИЧЕСТВО ПЕРЕСАДОК',
    'Все': 'Все',
    'Без пересадок': 'Без пересадок',
    '1 пересадка': '1 пересадка',
    '2 пересадки': '2 пересадки',
    '3 пересадки': '3 пересадки',
    'Посмотреть заказы': 'Посмотреть заказы',
    'Ваши заказы': 'Ваши заказы',
    'Очистить заказы': 'Очистить заказы',
    'Купить за': 'Купить за',
    'Ларнака': 'Ларнака',
    'Тель-Авив': 'Тель-Авив',
    'Владивосток': 'Владивосток'
  },
  'CHI': {
    'ВАЛЮТА': '货币',
    'КОЛИЧЕСТВО ПЕРЕСАДОК': '中转站',
    'Все': '全部',
    'Без пересадок': '无中转',
    '1 пересадка': '1次中转',
    '2 пересадки': '2次中转',
    '3 пересадки': '3次中转',
    'Посмотреть заказы': '查看订单',
    'Ваши заказы': '您的订单',
    'Очистить заказы': '清除订单',
    'Купить за': '购买',
    'Ларнака': '拉纳卡',
    'Тель-Авив': '特拉维夫',
    'Владивосток': '符拉迪沃斯托克'
  }
} as const; 