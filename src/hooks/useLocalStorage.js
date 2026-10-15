import { useEffect, useState } from 'react';

// Contrato: key permanece estable durante la vida del componente.
// El setter es el de React y admite valores y actualizaciones funcionales.
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? defaultValue : JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      if (import.meta.env.DEV) console.warn('[storage] No se pudo guardar la preferencia.');
    }
  }, [key, value]);

  return [value, setValue];
}
