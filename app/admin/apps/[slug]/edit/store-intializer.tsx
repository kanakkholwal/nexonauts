'use client';

import { useRef } from 'react';

import { AppTypeWithId } from 'src/models/app';
import { useAppStore } from './store';

function StoreInitializer({ app }: { app: AppTypeWithId }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useAppStore.setState({ ...app });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
