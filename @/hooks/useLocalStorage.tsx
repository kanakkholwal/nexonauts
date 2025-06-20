"use client";

import { useSyncExternalStore } from "react";

type StorageType = "localStorage" | "sessionStorage";

function useStorage<T>(
  key: string,
  initialValue: T,
  storageType: StorageType = "localStorage"
) {
  const isClient = typeof window !== "undefined";
  const storage = isClient ? window[storageType] : null;

  // Subscribe to storage changes
  const subscribe = (callback: () => void) => {
    if (!isClient) return () => {};

    const onStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === storage) {
        callback();
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  };

  // Get the stored value
  const getStoredValue = (): T => {
    if (!isClient) return initialValue;
    const item = storage?.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  };

  // Use useSyncExternalStore to manage state
  const value = useSyncExternalStore(subscribe, getStoredValue, getStoredValue);

  // Update the stored value
  const setValue = (newValue: T) => {
    if (!isClient) return;
    storage?.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: JSON.stringify(newValue),
        storageArea: storage,
      })
    );
  };

  return [value, setValue] as const;
}

export default useStorage;
