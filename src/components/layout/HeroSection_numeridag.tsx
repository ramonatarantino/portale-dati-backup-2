import { motion } from "framer-motion";
import { Database, Network, TrendingUp } from "lucide-react";

const HeroSection_dashboard = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Animated background network */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Network nodes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-4 h-4 bg-primary/40 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-32 right-20 w-3 h-3 bg-gold/50 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-1/4 w-5 h-5 bg-primary/30 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-32 right-1/3 w-2 h-2 bg-gold/60 rounded-full"
        />

        {/* Network connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600">
          <motion.path
            d="M100,100 L300,150 L500,100 L700,200 L900,150"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary/20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M200,200 L400,250 L600,200 L800,300 L1000,250"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-gold/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.path
            d="M150,300 L350,350 L550,300 L750,400 L950,350"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary/25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>

        {/* Floating data particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-10 text-gold/40 text-xs font-mono"
        >
          010101
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 left-20 text-primary/30 text-xs font-mono"
        >
          110011
        </motion.div>
        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-60 left-1/2 text-gold/35 text-xs font-mono"
        >
          001100
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Database className="w-4 h-4" />
            Portale Dati
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          <span className="text-primary">Numeri</span>{" "}
          <span className="text-gold-dark">DAG</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Esplora dati pubblici interattivi e statistiche dettagliate sulla pubblica amministrazione italiana
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="flex items-center gap-2 text-primary">
            <Network className="w-5 h-5" />
            <span className="text-sm font-medium">Dati Connessi</span>
          </div>
          <div className="flex items-center gap-2 text-gold-dark">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Analisi Real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection_dashboard;