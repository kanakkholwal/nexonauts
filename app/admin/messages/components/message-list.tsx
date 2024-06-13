'use client';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useMessagesStore } from '../store';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function MessageList({ type }: { type: 'all' | 'unread' }) {
  const [messages, selected] = useMessagesStore((state) => [
    state.messages.filter((message) => type === 'all' || !message.read),
    ,
    state.selected,
  ]);
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {messages.map((message) => (
          <button
            key={message._id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              selected === message._id && 'bg-muted'
            )}
            onClick={() => useMessagesStore.setState({ selected: message._id })}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{message.name}</div>
                  {!message.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    selected === message._id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{message.type}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {message.message.substring(0, 300)}
            </div>
          </button>
        ))}
        {messages.length === 0 && (
          <>
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No messages
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
