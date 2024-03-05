import React from "react";

type StateType = string | boolean | Record<string, any>
type StateValue = StateType | StateType[]

export function useLocalStorage(key: string, initialValue: StateValue) {
    const setState = (newValue: StateValue) => {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        window.dispatchEvent(
            new StorageEvent("storage", { key: key, newValue: JSON.stringify(newValue) })
        );
    };

    const getSnapshot = () => JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialValue)) as StateValue;

    const subscribe = (listener: () => void) => {
        window.addEventListener("storage", listener);
        return () => void window.removeEventListener("storage", listener);
    };

    const store = React.useSyncExternalStore(subscribe, getSnapshot);

    return [store, setState] as const;
}