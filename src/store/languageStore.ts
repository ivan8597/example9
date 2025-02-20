import { create } from 'zustand';

type Language = 'RUS' | 'CHI';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'RUS',
  setLanguage: (language) => set({ language })
})); 