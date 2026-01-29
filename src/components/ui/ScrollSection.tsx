import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  sticky?: boolean;
  disableEffects?: boolean;
}

export const ScrollSection = ({ 
  children, 
  className = "", 
  id,
  sticky = true,
  disableEffects = false 
}: ScrollSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={disableEffects ? {} : { opacity, scale }}
      className={`section-stack ${sticky ? 'sticky top-0' : ''} ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default ScrollSection;
