'use client';

import { useRef } from 'react';

import { profileType, useProfileStore } from './store';

function StoreInitializer({ profile }: { profile: profileType }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useProfileStore.setState({
      profile: profile,
    });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
