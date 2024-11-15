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

interface VersionedThemeState extends ThemeState {
  version: number;
  checkAndUpdateVersion: () => void;
}

const CURRENT_VERSION = 2; // Increment this when you make changes to the themes

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

const neonTheme: Theme = {
  ...defaultTheme,
  id: 'neon',
  name: 'Neon',
  primary: '#00ff00',
  secondary: '#ff00ff',
  background: '#000000',
  text: '#ffffff',
  borderRadius: 8,
  fontFamily: '"Orbitron", sans-serif',
}

const luxuryTheme: Theme = {
  ...defaultTheme,
  id: 'luxury',
  name: 'Luxury',
  primary: '#d4af37',
  secondary: '#c0c0c0',
  background: '#000000',
  text: '#ffffff',
  borderRadius: 0,
  fontFamily: '"Playfair Display", serif',
}

const cokeTheme: Theme = {
  ...defaultTheme,
  id: 'coke',
  name: 'Coca-Cola',
  primary: '#f40009',
  secondary: '#1e1e1e',
  background: '#ffffff',
  text: '#1e1e1e',
  borderRadius: 12,
  fontFamily: '"Gotham", sans-serif',
}

const programmerTheme: Theme = {
  ...defaultTheme,
  id: 'programmer',
  name: 'Programmer',
  primary: '#61afef',
  secondary: '#98c379',
  background: '#282c34',
  text: '#abb2bf',
  borderRadius: 2,
  fontFamily: '"Fira Code", monospace',
}

export const useThemeStore = create<VersionedThemeState>()(
  persist(
    (set, get) => ({
      themes: [
        defaultTheme,
        lightTheme,
        darkTheme,
        neonTheme,
        luxuryTheme,
        cokeTheme,
        programmerTheme,
        {
          ...defaultTheme,
          id: 'serif',
          name: 'Serif',
          fontFamily: '"Georgia", serif',
        },
        {
          ...defaultTheme,
          id: 'sans-serif',
          name: 'Sans Serif',
          fontFamily: '"Helvetica Neue", sans-serif',
        },
        {
          ...defaultTheme,
          id: 'italic-serif',
          name: 'Italic Serif',
          fontFamily: '"Baskerville", serif',
          fontSize: {
            small: 14,
            medium: 18,
            large: 24,
          },
        },
        {
          ...defaultTheme,
          id: 'italic-sans',
          name: 'Italic Sans',
          fontFamily: '"Gill Sans", sans-serif',
          fontSize: {
            small: 14,
            medium: 18,
            large: 24,
          },
        },
      ],
      currentThemeId: 'default',
      version: CURRENT_VERSION,
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
      checkAndUpdateVersion: () => {
        const state = get();
        if (state.version < CURRENT_VERSION) {
          set({
            version: CURRENT_VERSION,
            themes: [
              defaultTheme,
              lightTheme,
              darkTheme,
              neonTheme,
              luxuryTheme,
              cokeTheme,
              programmerTheme,
              {
                ...defaultTheme,
                id: 'serif',
                name: 'Serif',
                fontFamily: '"Georgia", serif',
              },
              {
                ...defaultTheme,
                id: 'sans-serif',
                name: 'Sans Serif',
                fontFamily: '"Helvetica Neue", sans-serif',
              },
              {
                ...defaultTheme,
                id: 'italic-serif',
                name: 'Italic Serif',
                fontFamily: '"Baskerville", serif',
                fontSize: {
                  small: 14,
                  medium: 18,
                  large: 24,
                },
              },
              {
                ...defaultTheme,
                id: 'italic-sans',
                name: 'Italic Sans',
                fontFamily: '"Gill Sans", sans-serif',
                fontSize: {
                  small: 14,
                  medium: 18,
                  large: 24,
                },
              },
            ],
            currentThemeId: state.themes.some(t => t.id === state.currentThemeId) 
              ? state.currentThemeId 
              : 'default'
          });
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)