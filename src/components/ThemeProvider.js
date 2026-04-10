'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LIGHT, DARK } from '@/lib/theme';

const ThemeContext = createContext({ isDark: false, t: LIGHT, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Read persisted preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('apex-dark-mode');
    if (saved === 'true') setIsDark(true);
  }, []);

  // Apply class to <html> so CSS transitions work globally
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('apex-dark-mode', String(isDark));
  }, [isDark]);

  const t = isDark ? DARK : LIGHT;
  const toggle = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, t, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
