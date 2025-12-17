import { Building2, Users, Briefcase, Calculator, UserCog, CalendarCheck, Monitor, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserTargetSection = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pubblica Amministrazione */}
          <Card className="bg-card border-border hover:border-primary/30 transition-all group h-full">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Sei una Pubblica Amministrazione?
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <Calculator className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Servizi Stipendiali</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <UserCog className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Gestione capitale umano</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <CalendarCheck className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Servizi giuridici e presenze</span>
                </div>
              </div>
              <Button className="mt-auto w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                Scopri il catalogo dei servizi
              </Button>
            </CardContent>
          </Card>

          {/* Personale PA */}
          <Card className="bg-card border-border hover:border-primary/30 transition-all group h-full">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Fai parte del personale della Pubblica Amministrazione?
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <Monitor className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">I servizi a te dedicati</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">App NoiPA</span>
                </div>
              </div>
              <Button className="mt-auto w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                Entra nel mondo NoiPA
              </Button>
            </CardContent>
          </Card>

          {/* Sindacati e altri */}
          <Card className="bg-card border-border hover:border-primary/30 transition-all group h-full">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Sei un sindacato, assicurazione, finanziaria o altro?
              </h3>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-gold/20 flex items-center justify-center mb-3 group-hover:bg-gold/30 transition-colors">
                  <Briefcase className="w-8 h-8 text-gold" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Accedi ai servizi dedicati agli operatori esterni della PA
                </p>
              </div>
              <Button className="mt-auto w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                Accedi ai servizi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserTargetSection;