"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Callback<T> = (value: T) => void | Promise<void>;

export function useUrlState<T>(
  key: string,
  defaultValue: T,
  callback?: Callback<T>
) {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const initialValue = searchParams.has(key)
    ? JSON.parse(JSON.stringify(searchParams.get(key)))
    : defaultValue;

  const [state, setState] = useState<T>(initialValue);

  const updateUrl = useCallback(
    (value: T) => {
      const params = new URLSearchParams(searchParams);
      if (
        value !== undefined &&
        value !== null &&
        value?.toString()?.trim() !== ""
      ) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [key, router, searchParams]
  );

  const setUrlState = useCallback(
    async (value: T) => {
      setState(value);
      updateUrl(value);
      if (callback) {
        try {
          await callback(value);
        } catch (error) {
          console.error("Error in callback:", error);
        }
      }
    },
    [callback, updateUrl]
  );

  useEffect(() => {
    const paramValue = searchParams.has(key)
      ? JSON.parse(JSON.stringify(searchParams.get(key)))
      : null;
    if (paramValue !== null && paramValue !== state) {
      setState(paramValue);
    }
  }, [key, searchParams, state]);

  return [state, setUrlState] as const;
}
