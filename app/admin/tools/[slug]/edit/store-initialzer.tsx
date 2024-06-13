'use client';

import { useRef } from 'react';

import { toolType, useFormStore } from './store';

function StoreInitializer({ tool }: { tool: toolType }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useFormStore.setState({
      tool: tool,
    });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
