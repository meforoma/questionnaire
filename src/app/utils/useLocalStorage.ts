import {
  useCallback, useEffect, useState,
} from 'react';

type SetFunction<T> = (value: T) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetFunction<T>] {
  const storage = window.localStorage;

  const readFromStorage = useCallback(() => {
    if (!storage) {
      return initialValue;
    }

    const item = storage.getItem(key);

    return item && item !== String(undefined)
      ? JSON.parse(item)
      : initialValue;
    },
    [initialValue, key, storage],
  );

  const [storedValue, setStoredValue] = useState(readFromStorage());

  const writeToStorage = useCallback((value: T) => {
    if (storage) {
      storage.setItem(key, JSON.stringify(value));
    }
  }, [key, storage]);

  const setValue: SetFunction<T> = useCallback((value) => {
    setStoredValue(value);
    writeToStorage(value);
  }, [writeToStorage]);

  useEffect(() => {
    const value = readFromStorage();

    setValue(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}
