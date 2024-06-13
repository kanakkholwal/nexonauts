'use client';

import { useRef } from 'react';

import { Message, useMessagesStore } from './store';

function StoreInitializer({ messages }: { messages: Message[] }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useMessagesStore.setState({
      messages: messages,
      selected: messages.length > 0 ? messages[0]._id : null,
      totalPages: 0,
      currentPage: 1,
      query: '',
      filter: {},
    });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
