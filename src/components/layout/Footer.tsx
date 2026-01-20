export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold mb-4">NoiPA OpenData</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Piattaforma di visualizzazione e analisi dei dati aperti degli amministrati pubblici italiani.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Risorse</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentazione</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Dataset</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © 2025 MEF - Ministero dell'Economia e delle Finanze. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
