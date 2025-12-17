import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="h-12 w-12 bg-foreground mb-4" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function AboutSection() {
  const features = [
    {
      title: "Título do Benefício 1",
      description:
        "Aqui vai a descrição do primeiro benefício do produto ou serviço oferecido.",
    },
    {
      title: "Título do Benefício 2",
      description:
        "Aqui vai a descrição do segundo benefício do produto ou serviço oferecido.",
    },
    {
      title: "Título do Benefício 3",
      description:
        "Aqui vai a descrição do terceiro benefício do produto ou serviço oferecido.",
    },
  ];

  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Título da Seção Sobre
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Aqui vai o texto de descrição da seção sobre, explicando os principais benefícios e diferenciais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
