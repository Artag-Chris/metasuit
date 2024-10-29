"use client";
import { useUIStore } from "@/store";


export default function Home() {
  const { 
    isDarkMode, 
    colorScheme, 
    borderRadius, 
    modalOpacity, 
    font, 
    toggleDarkMode, 
    setColorScheme, 
    setBorderRadius, 
    setModalOpacity, 
    setFont 
  } = useUIStore()
  return (
    <div style={{ 
      backgroundColor: colorScheme.background, 
      color: colorScheme.text,
      borderRadius: borderRadius === 'rounded' ? '10px' : '0',
      fontFamily: font
    }}>
      <button onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
      {/* Otros elementos de UI */}

     <h1>Geist</h1>
    </div>
  );
}
