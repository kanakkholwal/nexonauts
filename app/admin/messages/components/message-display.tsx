'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useMessagesStore } from '../store';

export function MessageDisplay() {
  const message = useMessagesStore((state) =>
    state.messages.find((message) => message._id === state.selected)
  );

  return (
    <>
      {message ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={message.name} />
                <AvatarFallback>
                  {message.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{message.name}</div>
                <div className="line-clamp-1 text-xs">{message.type}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {message.email}
                </div>
              </div>
            </div>
            {message.createdAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(message.createdAt), 'PPpp')}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {message.message}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${message.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch
                      id="mute"
                      aria-label="Mute thread"
                      disabled={true}
                    />{' '}
                    Mute this thread
                  </Label>
                  <div className="ml-auto space-x-2">
                    <Button onClick={(e) => e.preventDefault()} size="sm">
                      Send
                    </Button>
                    <Button
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                      variant="destructive_light"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </>
  );
}
