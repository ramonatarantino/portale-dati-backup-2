import { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoPopupProps {
  title: string;
  content: ReactNode;
  children?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const InfoPopup = ({
  title,
  content,
  children,
  side = "top",
  className,
}: InfoPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children || (
          <button
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20",
              className
            )}
          >
            <Info className="h-3 w-3" />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        className="w-80 border-primary/20 bg-card p-0 shadow-popup"
      >
        <div className="border-b border-border bg-primary/5 px-4 py-3">
          <h4 className="font-semibold text-primary">{title}</h4>
        </div>
        <div className="p-4 text-sm text-card-foreground">{content}</div>
      </PopoverContent>
    </Popover>
  );
};
