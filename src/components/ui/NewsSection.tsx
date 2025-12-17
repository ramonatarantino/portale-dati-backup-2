import { Calendar, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const newsItems = [
  {
    id: 1,
    category: "MONDO NOIPA",
    title: "NoiPA sicuri: nuovi strumenti per la protezione dell'accesso",
    description: "Prosegue l'impegno di NoiPA per la sicurezza informatica e la protezione dei dati personali degli utenti.",
    date: "16/12/2025",
  },
  {
    id: 2,
    category: "MONDO NOIPA",
    title: "NoiPA spiega: la tredicesima",
    description: "La tredicesima: quando viene liquidata e quali sono le voci che la compongono.",
    date: "02/12/2025",
  },
  {
    id: 3,
    category: "OPEN DATA",
    title: "Nuovi dataset disponibili sul patrimonio informativo",
    description: "Aggiornamento mensile dei dati relativi agli stipendi e alle posizioni della PA.",
    date: "01/12/2025",
  },
  {
    id: 4,
    category: "SERVIZI",
    title: "Aggiornamento dell'area personale",
    description: "Nuove funzionalità per la consultazione del cedolino e la gestione delle richieste.",
    date: "28/11/2025",
  },
  {
    id: 5,
    category: "OPEN DATA",
    title: "Report trimestrale sulla spesa pubblica",
    description: "Pubblicato il nuovo report con analisi dettagliate sulla distribuzione degli stipendi.",
    date: "25/11/2025",
  },
  {
    id: 6,
    category: "SERVIZI",
    title: "Nuova app mobile NoiPA",
    description: "Disponibile la nuova versione dell'app con interfaccia rinnovata e funzionalità migliorate.",
    date: "20/11/2025",
  },
];

const NewsSection = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="news" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge className="bg-gold/20 text-gold-dark hover:bg-gold/30 mb-4">
              Ultime Notizie
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              News e Aggiornamenti
            </h2>
          </div>
          <Button variant="outline" className="group w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Vedi tutte le news
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* News Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {newsItems.map((news) => (
              <CarouselItem key={news.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full group cursor-pointer border-border hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="h-32 hero-gradient flex items-center justify-center">
                    <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-gold-light">N</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                        {news.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {news.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-4">
                      {news.description}
                    </CardDescription>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Leggi di più
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-primary text-primary-foreground hover:bg-primary-dark border-0" />
            <CarouselNext className="static translate-y-0 bg-primary text-primary-foreground hover:bg-primary-dark border-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default NewsSection;