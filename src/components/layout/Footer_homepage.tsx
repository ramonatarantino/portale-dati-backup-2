import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/Logo_mef.svg.png"
                alt="MEF Logo"
                className="h-30 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Non accumuliamo dati, creiamo conoscenza condividendo informazioni.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-light">Link Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#opendata" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  Open Data
                </a>
              </li>
              <li>
                <a href="#numeri" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  Numeri DAG
                </a>
              </li>
              <li>
                <a href="#news" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors flex items-center gap-1">
                  Area Personale
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-light">Risorse</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  Documentazione API
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  Catalogo Dataset
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  Report Statistici
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-light">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5 text-gold/70" />
                <span>Ministero dell'Economia e delle Finanze<br />Roma, Italia</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 text-gold/70" />
                <a href="mailto:info@mef.it" className="hover:text-gold transition-colors">
                  info@mef.it
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 text-gold/70" />
                <span>800 991 990</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-primary-foreground/60">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-gold transition-colors">Note Legali</a>
              <span>|</span>
              <a href="#" className="hover:text-gold transition-colors">Accessibilità</a>
            </div>
          </div>
          <p className="text-center text-xs text-primary-foreground/50 mt-6">
            © 2025 MEF - Tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;