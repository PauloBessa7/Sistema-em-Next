import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PricingPlanProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  isPopular?: boolean;
}

function PricingCard({
  name,
  description,
  price,
  period,
  features,
  buttonText,
  buttonVariant = "default",
  isPopular = false,
}: PricingPlanProps) {
  return (
    <Card className={isPopular ? "border-2 border-foreground relative" : ""}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="font-mono text-xs">POPULAR</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={buttonVariant}
          className={buttonVariant === "outline" ? "w-full bg-transparent" : "w-full"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingSection() {
  const plans = [
    {
      name: "Nome do Plano 1",
      description: "Descrição do plano 1",
      price: "R$XX",
      period: "/mês",
      features: [
        "Benefício 1 do plano",
        "Benefício 2 do plano",
        "Benefício 3 do plano",
        "Benefício 4 do plano",
      ],
      buttonText: "Texto do Botão",
      buttonVariant: "outline" as const,
      isPopular: false,
    },
    {
      name: "Nome do Plano 2",
      description: "Descrição do plano 2",
      price: "R$XX",
      period: "/mês",
      features: [
        "Benefício 1 do plano",
        "Benefício 2 do plano",
        "Benefício 3 do plano",
        "Benefício 4 do plano",
        "Benefício 5 do plano",
      ],
      buttonText: "Texto do Botão",
      buttonVariant: "default" as const,
      isPopular: true,
    },
    {
      name: "Nome do Plano 3",
      description: "Descrição do plano 3",
      price: "R$XX",
      period: "/mês",
      features: [
        "Benefício 1 do plano",
        "Benefício 2 do plano",
        "Benefício 3 do plano",
        "Benefício 4 do plano",
        "Benefício 5 do plano",
      ],
      buttonText: "Texto do Botão",
      buttonVariant: "outline" as const,
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="border-t border-border bg-muted/30 py-24">
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Título da Seção de Preços</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Aqui vai a descrição da seção de preços e planos disponíveis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
