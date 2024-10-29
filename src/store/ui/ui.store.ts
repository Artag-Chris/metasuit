import { create } from 'zustand'

interface ColorScheme {
  primary: string
  secondary: string
  background: string
  text: string
}

interface UIState {
  isDarkMode: boolean
  colorScheme: ColorScheme
  borderRadius: 'rounded' | 'square'
  modalOpacity: number
  font: string

  toggleDarkMode: () => void
  setColorScheme: (colorScheme: Partial<ColorScheme>) => void
  setBorderRadius: (borderRadius: 'rounded' | 'square') => void
  setModalOpacity: (opacity: number) => void
  setFont: (font: string) => void
}

const lightColors: ColorScheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ffffff',
  text: '#333333',
}

const darkColors: ColorScheme = {
  primary: '#2980b9',
  secondary: '#27ae60',
  background: '#2c3e50',
  text: '#ecf0f1',
}

export const useUIStore = create<UIState>()((set) => ({
  isDarkMode: false,
  colorScheme: lightColors,
  borderRadius: 'rounded',
  modalOpacity: 0.8,
  font: 'geist',

  toggleDarkMode: () => set((state) => ({ 
    isDarkMode: !state.isDarkMode,
    colorScheme: state.isDarkMode ? lightColors : darkColors
  })),

  setColorScheme: (newColorScheme) => set((state) => ({
    colorScheme: { ...state.colorScheme, ...newColorScheme }
  })),

  setBorderRadius: (borderRadius) => set({ borderRadius }),

  setModalOpacity: (opacity) => set({ modalOpacity: opacity }),

  setFont: (font) => set({ font }),
}))