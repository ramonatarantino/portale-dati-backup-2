import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserMinus, Users, Building2 } from 'lucide-react';

export type DataMode = 'assunzioni' | 'cessazioni' | 'inquadramento_eta' | 'inquadramento';

interface ModeConfig {
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
  description: string;
}

const modeConfigs: Record<DataMode, ModeConfig> = {
  assunzioni: {
    label: 'Assunzioni',
    shortLabel: 'Assunz.',
    icon: <UserPlus className="h-4 w-4" />,
    color: 'hsl(220, 70%, 50%)',
    activeColor: 'hsl(220, 70%, 45%)',
    description: 'Nuove assunzioni'
  },
  cessazioni: {
    label: 'Cessazioni',
    shortLabel: 'Cess.',
    icon: <UserMinus className="h-4 w-4" />,
    color: 'hsl(0, 65%, 50%)',
    activeColor: 'hsl(0, 55%, 45%)',
    description: 'Cessazioni rapporto'
  },
  inquadramento_eta: {
    label: 'Età/Genere',
    shortLabel: 'Età',
    icon: <Users className="h-4 w-4" />,
    color: 'hsl(280, 65%, 50%)',
    activeColor: 'hsl(280, 55%, 45%)',
    description: 'Per età e genere'
  },
  inquadramento: {
    label: 'Inquadram.',
    shortLabel: 'Inq.',
    icon: <Building2 className="h-4 w-4" />,
    color: 'hsl(160, 65%, 40%)',
    activeColor: 'hsl(160, 55%, 35%)',
    description: 'Per qualifica'
  }
};

interface DataModeToggleProps {
  mode: DataMode;
  onModeChange: (mode: DataMode) => void;
}

const DataModeToggle: React.FC<DataModeToggleProps> = ({ mode, onModeChange }) => {
  const modes: DataMode[] = ['assunzioni', 'cessazioni', 'inquadramento_eta', 'inquadramento'];
  const currentIndex = modes.indexOf(mode);

  return (
    <motion.div
      className="relative inline-flex items-center p-1.5 bg-muted rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Sliding background indicator */}
      <motion.div
        className="absolute top-1.5 bottom-1.5 rounded-lg z-0"
        style={{
          backgroundColor: modeConfigs[mode].color,
          boxShadow: `0 4px 15px ${modeConfigs[mode].color}40`,
        }}
        initial={false}
        animate={{
          left: `calc(${currentIndex * 25}% + 6px)`,
          width: 'calc(25% - 8px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        />
      </motion.div>

      {modes.map((m) => {
        const config = modeConfigs[m];
        const isActive = mode === m;
        
        return (
          <motion.button
            key={m}
            onClick={() => onModeChange(m)}
            className={`relative z-10 flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2.5 rounded-lg font-medium text-xs transition-all duration-200 ${
              isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
            style={{ 
              minWidth: '60px',
              flex: '1 1 25%'
            }}
            whileHover={{ scale: isActive ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Icon with animation on switch */}
            <motion.span
              animate={{ 
                rotate: isActive ? [0, -10, 10, 0] : 0,
                scale: isActive ? [1, 1.15, 1] : 1
              }}
              transition={{ 
                duration: 0.35,
                ease: 'easeOut'
              }}
              className="shrink-0"
            >
              {config.icon}
            </motion.span>
            {/* Label - hidden on mobile, visible on sm+ */}
            <span className="hidden sm:inline truncate">{config.label}</span>
            {/* Short label on mobile only */}
            <span className="inline sm:hidden truncate">{config.shortLabel}</span>
          </motion.button>
        );
      })}

      {/* Particle effects on switch */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}-${mode}`}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            backgroundColor: modeConfigs[mode].color,
            left: `calc(${(currentIndex * 25) + 12.5}%)`,
            top: '50%',
          }}
          initial={{ 
            scale: 0, 
            x: 0, 
            y: 0,
            opacity: 0.9 
          }}
          animate={{ 
            scale: [0, 1.2, 0],
            x: Math.cos((i / 5) * Math.PI * 2) * 20,
            y: Math.sin((i / 5) * Math.PI * 2) * 10,
            opacity: [0.9, 0.4, 0]
          }}
          transition={{ 
            duration: 0.45,
            delay: i * 0.025,
            ease: 'easeOut'
          }}
        />
      ))}
    </motion.div>
  );
};

export default DataModeToggle;
