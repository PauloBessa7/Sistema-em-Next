import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
}

function TestimonialCard({ rating, title, content, author }: TestimonialProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
          ))}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{content}</p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-muted rounded-full" />
          <div>
            <p className="font-medium text-sm">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResultsSection() {
  const testimonials = [
    {
      rating: 5,
      title: "Título do Depoimento 1",
      content:
        "Aqui vai ficar o comentário de testemunha do cliente 1, descrevendo sua experiência com o produto ou serviço.",
      author: {
        name: "Nome do Cliente 1",
        role: "Cargo do Cliente 1",
      },
    },
    {
      rating: 5,
      title: "Título do Depoimento 2",
      content:
        "Aqui vai ficar o comentário de testemunha do cliente 2, descrevendo sua experiência com o produto ou serviço.",
      author: {
        name: "Nome do Cliente 2",
        role: "Cargo do Cliente 2",
      },
    },
    {
      rating: 5,
      title: "Título do Depoimento 3",
      content:
        "Aqui vai ficar o comentário de testemunha do cliente 3, descrevendo sua experiência com o produto ou serviço.",
      author: {
        name: "Nome do Cliente 3",
        role: "Cargo do Cliente 3",
      },
    },
  ];

  return (
    <section id="results" className="py-24">
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Título da Seção de Depoimentos
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Aqui vai a descrição da seção de depoimentos dos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
