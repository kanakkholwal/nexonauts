'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function DeleteAppButton({
  deleteApp,
  appId,
  className,
  ...props
}: {
  deleteApp: (string) => Promise<boolean>;
  appId: string;
  className?: string;
  props?: any;
}) {
  const router = useRouter();

  return (
    <Button
      className={cn(
        'transition transform duration-300 hover:-translate-y-1',
        className
      )}
      {...props}
      onClick={() => {
        if (confirm('Are you sure you want to delete this app?') === false)
          return;

        toast.promise(deleteApp(appId), {
          loading: 'Deleting App...',
          success: () => {
            router.push(`/dashboard/apps`);
            return 'App Deleted!';
          },
          error: (err) => {
            console.error(err);
            return 'Error Deleting App';
          },
        });
      }}
      variant="destructive_light"
    >
      Delete App <Trash2 className="w-5 h-5 ml-2" />
    </Button>
  );
}
