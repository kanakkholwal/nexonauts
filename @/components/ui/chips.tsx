import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Badge, BadgeProps } from "./badge";

export interface ChipProps extends BadgeProps {
  onRemove?: (value?: string) => void;
  value?: string;
  closeIcon?: React.ReactNode;
  closeIconClassName?: string;
  showCloseIcon?: boolean;
}

export function Chip(props: ChipProps) {
  const {
    onRemove,
    value,
    closeIcon,
    closeIconClassName,
    showCloseIcon,
    ...rest
  } = props;

  return (
    <Badge
      variant="secondary"
      className={cn("cursor-pointer", props.className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onClick?.(e);
      }}
      {...rest}
    >
      {props.children}
      {showCloseIcon && (
        <div
          className={cn(
            "p-0 bg-gray-500 border-none hover:bg-gray-600 hover:text-white rounded-full cursor-pointer transition",
            closeIconClassName
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRemove?.(value);
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={() => onRemove?.(value)}
        >
          {closeIcon ? (
            closeIcon
          ) : (
            <X className="h-4 w-4 fill-gray-300 font-bold" />
          )}
        </div>
      )}
    </Badge>
  );
}
