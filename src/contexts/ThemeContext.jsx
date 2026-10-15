import { useCallback, useEffect, useMemo } from 'react';
import { ThemeContext } from './theme-context';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useLocalStorage('academico.theme', 'light');
  // Un JSON válido también puede contener un valor que no sea un tema.
  const theme = preference === 'dark' ? 'dark' : 'light';
  const toggleTheme = useCallback(() => {
    setPreference((current) => (current === 'dark' ? 'light' : 'dark'));
  }, [setPreference]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
