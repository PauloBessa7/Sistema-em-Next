import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <Badge variant="secondary" className="font-mono text-xs">
          Versão 1.0 em desenvolvimento
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-6xl">
          Construa mais rápido com componentes de design modernos
        </h1>
        <div className="flex gap-4 mt-4">
          <Button size="lg">
            Começar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Components
          </Button>
        </div>
      </div>
    </section>
  );
}
