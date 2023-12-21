import { useState, useEffect } from "react";

export function useLocalStorageState(initials, key) {
  const [value, setValue] = useState(function () {
    const storeValue = localStorage.getItem(key);
    console.log(storeValue);
    return storeValue ? JSON.parse(storeValue) : initials;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
