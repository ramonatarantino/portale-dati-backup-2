import { useState, useEffect } from "react";

const HeroSection = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setParallaxOffset(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero-section" className="relative hero-gradient py-16 md:py-24 pb-32 md:pb-40 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-ping" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-green-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }} />
        <div className="absolute top-10 right-10 w-16 h-16 bg-red-500/5 rounded-full blur-xl animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-yellow-500/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }} />
        <div className="absolute top-2/3 right-1/4 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '9s' }} />
        <div
          className="hero-data-layer absolute inset-0"
          style={{ transform: `translateY(${parallaxOffset * -0.06}px) scale(1.05)` }}
        />
        <div
          className="hero-data-gradient absolute inset-x-0 bottom-0 h-48"
          style={{ transform: `translateY(${parallaxOffset * 0.12}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6 animate-fade-in">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold-light text-sm font-medium">Portale della Trasparenza</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Patrimonio Informativo{" "}
            <span className="gold-text">DAG</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up stagger-1">
            Non accumuliamo dati, creiamo conoscenza condividendo informazioni.
            Scopri i dati della Pubblica Amministrazione.
          </p>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;