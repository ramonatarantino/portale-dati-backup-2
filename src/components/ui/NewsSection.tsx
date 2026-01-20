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
    category: "OPEN DATA",
    title: "Pubblicato LOD Gennaio 2026",
    description:
      "Disponibili i LOD di Gennaio 2026 per Modalità di accesso, Struttura organizzativa delle Amministrazioni, Rapporti di lavoro, Trattamento economico e Mobilità degli amministrati.",
    date: "15/02/2026",
  },
  {
    id: 2,
    category: "OPEN DATA",
    title: "Pubblicato LOD Dicembre 2025",
    description:
      "Aggiornamento mensile dei LOD relativi a Modalità di accesso, Rapporti di lavoro e Trattamento economico – Dicembre 2025.",
    date: "15/01/2026",
  },
  {
    id: 3,
    category: "NUMERI DAG",
    title: "Numeri DAG – Gennaio 2026",
    description:
      "Pubblicati i principali indicatori quantitativi DAG aggiornati a Gennaio 2026, con focus su consistenza del personale e mobilità.",
    date: "10/02/2026",
  },
  {
    id: 4,
    category: "OPEN DATA",
    title: "Pubblicato LOD Novembre 2025",
    description:
      "Rilasciati i LOD di Novembre 2025 per Struttura organizzativa delle Amministrazioni e Trattamento economico.",
    date: "15/12/2025",
  },
  {
    id: 5,
    category: "NUMERI DAG",
    title: "Numeri DAG – Dicembre 2025",
    description:
      "Aggiornamento mensile dei Numeri DAG con dati consolidati su rapporti di lavoro e distribuzione del personale.",
    date: "10/01/2026",
  },
  {
    id: 6,
    category: "NUMERI DAG",
    title: "Numeri DAG – Novembre 2025",
    description:
      "Aggiornamento mensile dei Numeri DAG con dati consolidati su rapporti di lavoro e distribuzione del personale.",
    date: "10/11/2025",
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
            Esplora i LOD
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