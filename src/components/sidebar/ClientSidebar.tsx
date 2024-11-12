'use client'

import React, { useLayoutEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useThemeStore } from '@/store/ui/ThemeConfiguration';

export default function ClientSidebar({ children }: { children: React.ReactNode }) {
  const { themes, currentThemeId } = useThemeStore();
  const [isThemeApplied, setIsThemeApplied] = useState(false);

  useLayoutEffect(() => {
    const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0];
    
    // Aplicar el tema inmediatamente
    document.body.style.setProperty('--background', currentTheme.background);
    document.body.style.setProperty('--foreground', currentTheme.text);
    document.body.style.setProperty('--primary', currentTheme.primary);
    document.body.style.setProperty('--border-radius', `${currentTheme.borderRadius}px`);
    document.body.style.fontFamily = currentTheme.fontFamily;
    
    setIsThemeApplied(true);
  }, [themes, currentThemeId]);

  if (!isThemeApplied) {
    return <div>Applying theme...</div>;
  }

  return <Sidebar>{children}</Sidebar>;
}