import { SavedTicket } from '../types/ticket';

const STORAGE_KEYS = {
  LANGUAGE: 'language-storage',
  TICKETS: 'tickets',
  FAVORITES: 'favorites'
} as const;

export const storage = {
  getLanguage: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting language:', error);
      return null;
    }
  },

  getTickets: (): SavedTicket[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting tickets:', error);
      return [];
    }
  },

  getFavorites: (): SavedTicket[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }
}; 