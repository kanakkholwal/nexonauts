import { cn } from '@/lib/utils';
import './loader.css';

export function RingLoader({
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      className={cn('w-60 h-60', className)}
      width={240}
      height={240}
      viewBox="0 0 240 240"
      {...props}
    >
      <circle
        className="pl__ring pl__ring--a"
        cx={120}
        cy={120}
        r={105}
        fill="none"
        stroke="#000"
        stroke-width={20}
        stroke-dasharray="0 660"
        stroke-dashoffset={-330}
        stroke-linecap="round"
      />
      <circle
        className="pl__ring pl__ring--b"
        cx={120}
        cy={120}
        r={35}
        fill="none"
        stroke="#000"
        stroke-width={20}
        stroke-dasharray="0 220"
        stroke-dashoffset={-110}
        stroke-linecap="round"
      />
      <circle
        className="pl__ring pl__ring--c"
        cx={85}
        cy={120}
        r={70}
        fill="none"
        stroke="#000"
        stroke-width={20}
        stroke-dasharray="0 440"
        stroke-linecap="round"
      />
      <circle
        className="pl__ring pl__ring--d"
        cx={155}
        cy={120}
        r={70}
        fill="none"
        stroke="#000"
        stroke-width={20}
        stroke-dasharray="0 440"
        stroke-linecap="round"
      />
    </svg>
  );
}
