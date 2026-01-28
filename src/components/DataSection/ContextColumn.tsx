import { useInView } from "@/hooks/useInView";

interface ContextColumnProps {
  title: string;
  question: string;
  description?: string;
}

export function ContextColumn({ title, question, description }: ContextColumnProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-center transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="text-4xl font-semibold text-foreground leading-tight mb-6">
        {title}
      </h2>
      <p className="text-xl text-apple-blue font-light leading-relaxed mb-4">
        "{question}"
      </p>
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      )}
    </div>
  );
}
