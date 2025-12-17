import { motion } from 'framer-motion';
import { Database, TrendingUp, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="apple-section hero-gradient">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="apple-heading mb-6 text-white">
            Dati Amministrati Pubblici
          </h1>
          <p className="apple-subheading mb-12 max-w-3xl mx-auto text-blue-100">
            Esplora, analizza e comprendi i dati aperti degli amministrati pubblici italiani con visualizzazioni interattive e moderne.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <div className="apple-card p-8 bg-white/10 backdrop-blur-sm border-white/20">
            <Database className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Dataset Completo</h3>
            <p className="text-sm text-blue-100">
              Dati demografici, geografici e accessi per regione ed ente
            </p>
          </div>
          <div className="apple-card p-8 bg-white/10 backdrop-blur-sm border-white/20">
            <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Analisi Temporali</h3>
            <p className="text-sm text-blue-100">
              Trend e pattern di accesso nel tempo per anno e mese
            </p>
          </div>
          <div className="apple-card p-8 bg-white/10 backdrop-blur-sm border-white/20">
            <Users className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Insights Demografici</h3>
            <p className="text-sm text-blue-100">
              Distribuzione per età, genere e credenziali utilizzate
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
