import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TutorialCardProps {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const TutorialCard = ({
  step,
  title,
  description,
  icon,
  isActive = false,
  onClick,
}: TutorialCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-card-hover border-2",
        isActive
          ? "border-primary bg-primary/5 shadow-card-hover"
          : "border-transparent hover:border-primary/30"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {step}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
              isActive ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>
        </div>
        <CardTitle className="mt-3 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
