import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface AppleCardProps {
  icon: LucideIcon;
  label: string;
  question: string;
  content: ReactNode;
  isActive: boolean;
  isOtherActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  index: number;
  pattern: "dots" | "lines" | "grid";
}

export const AppleCard = ({
  icon: Icon,
  label,
  question,
  content,
  isActive,
  isOtherActive,
  onActivate,
  onDeactivate,
  index,
  pattern,
}: AppleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const patternClass = {
    dots: "pattern-dots",
    lines: "pattern-lines",
    grid: "pattern-grid",
  }[pattern];

  const handleClick = () => {
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className="relative cursor-pointer"
      style={{
        flex: isActive ? 2.2 : isOtherActive ? 0.5 : 1,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
        layout: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
      }}
      onClick={handleClick}
    >
      <motion.div
        className={`
          relative h-full overflow-hidden rounded-2xl
          bg-card-gradient border border-border/60
          ${isActive ? 'shadow-apple-active' : 'shadow-apple'}
          ${isOtherActive ? 'opacity-60' : 'opacity-100'}
        `}
        animate={{
          scale: isActive ? 1.02 : isOtherActive ? 0.98 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Micro-pattern background */}
        <motion.div
          className={`absolute inset-0 ${patternClass} pointer-events-none`}
          animate={{
            opacity: isActive ? 0.3 : 0.5,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Subtle gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${isActive ? '30%' : '50%'} 0%, hsl(211 100% 50% / 0.04) 0%, transparent 60%)`,
          }}
          animate={{
            opacity: isActive ? 1 : 0.6,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Thin top line accent */}
        <motion.div
          className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            opacity: isActive ? 1 : 0.4,
            scaleX: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Content */}
        <div className="relative z-10 p-7 md:p-8 h-full flex flex-col min-h-[320px]">
          {/* Icon with subtle animation */}
          <motion.div
            className="mb-6"
            animate={{
              scale: isActive ? 1.1 : 1,
              y: isActive ? -2 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Icon background glow */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/8"
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.6 }}
              />
              <Icon
                className="relative z-10 w-6 h-6 text-primary"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Label */}
          <motion.span
            className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3"
            animate={{
              opacity: isOtherActive ? 0.4 : 0.7,
              letterSpacing: isActive ? '0.1em' : '0.05em',
            }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.span>

          {/* Question / Title */}
          <motion.h3
            className="text-xl md:text-2xl font-semibold text-foreground leading-snug tracking-tight"
            animate={{
              opacity: isOtherActive ? 0.5 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {question}
          </motion.h3>

          {/* Preview graphics and button - shown when not active */}
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 0 : 1,
              height: isActive ? 0 : "auto",
              marginTop: isActive ? 0 : 16,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="overflow-hidden"
          >
            {/* Graphic elements */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-gold" />
              </motion.div>
              <motion.div
                className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-3 h-3 border-2 border-primary/30 rounded" />
              </motion.div>
            </div>

            {/* Scopri di più button */}
            <motion.button
              className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-lg border border-primary/20 hover:border-primary/30 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onActivate();
              }}
            >
              Scopri di più
            </motion.button>
          </motion.div>

          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              height: isActive ? "auto" : 0,
              marginTop: isActive ? 24 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.4, delay: isActive ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            {/* Divider line */}
            <motion.div
              className="h-px bg-gradient-to-r from-border via-border/80 to-transparent mb-5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: 'left' }}
            />
            <div className="text-[15px] text-muted-foreground leading-relaxed">
              {content}
            </div>
            {/* Esplora button */}
            <motion.button
              className="mt-6 w-full py-3 px-4 bg-primary hover:bg-primary-dark text-primary-foreground text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = '/dashboard#cosa-e-opendag';
              }}
            >
              Esplora
            </motion.button>
          </motion.div>

          {/* Bottom decorative element */}
          <div className="mt-auto pt-6">
            <motion.div
              className="flex items-center gap-2"
              animate={{
                opacity: isActive ? 0 : 0.4,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <div className="w-1 h-1 rounded-full bg-primary/30" />
            </motion.div>
          </div>
        </div>

        {/* Active state bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};