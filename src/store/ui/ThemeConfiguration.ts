import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  borderRadius: number;
  fontFamily: string;
  fontSize: {
    small: number;
    medium: number;
    large: number;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
}

interface ThemeState {
  themes: Theme[];
  currentThemeId: string;
  addTheme: (theme: Theme) => void;
  updateTheme: (id: string, newTheme: Partial<Theme>) => void;
  setCurrentTheme: (id: string) => void;
  resetTheme: (id: string) => void;
}

const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  primary: '#3490dc',
  secondary: '#ffed4a',
  background: '#ffffff',
  text: '#333333',
  borderRadius: 4,
  fontFamily: 'Arial, sans-serif',
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
}

const lightTheme: Theme = {
  ...defaultTheme,
  id: 'light',
  name: 'Light',
  background: '#f8f9fa',
  text: '#212529',
}

const darkTheme: Theme = {
  ...defaultTheme,
  id: 'dark',
  name: 'Dark',
  background: '#212529',
  text: '#f8f9fa',
  primary: '#61dafb',
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themes: [defaultTheme, lightTheme, darkTheme],
      currentThemeId: 'default',
      addTheme: (theme) => set((state) => ({ themes: [...state.themes, theme] })),
      updateTheme: (id, newTheme) => set((state) => ({
        themes: state.themes.map((theme) => 
          theme.id === id ? { ...theme, ...newTheme } : theme
        ),
      })),
      setCurrentTheme: (id) => set({ currentThemeId: id }),
      resetTheme: (id) => set((state) => ({
        themes: state.themes.map((theme) => 
          theme.id === id ? (id === 'default' ? defaultTheme : theme) : theme
        ),
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
)