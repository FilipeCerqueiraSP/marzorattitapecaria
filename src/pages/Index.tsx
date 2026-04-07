import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Palette, Sofa } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  {
    icon: Sofa,
    title: "Sob Medida",
    description: "Móveis estofados projetados exclusivamente para o seu espaço.",
  },
  {
    icon: Palette,
    title: "Variedade de Tecidos",
    description: "Centenas de opções em cores, texturas e materiais premium.",
  },
  {
    icon: Scissors,
    title: "Artesanato Local",
    description: "Tradição e qualidade do bairro do Ipiranga, São Paulo.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 patchwork-bg opacity-40" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-4 animate-fade-in">
            Arte em Estofados
          </h1>
          <div className="stitch-line max-w-xs mx-auto my-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Criamos e restauramos móveis estofados com a dedicação artesanal que só
            a tradição do Ipiranga pode oferecer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Ver Catálogo <ArrowRight size={18} />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 stitch-border px-6 py-3 font-medium text-primary hover:bg-muted transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-center text-primary mb-12">
            Por que nos escolher
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="stitch-border-light p-8 text-center bg-background hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-5">
                  <f.icon size={28} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-semibold text-primary mb-4">
            Visite nosso Portfólio
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Conheça nossos trabalhos mais recentes e inspire-se para o seu próximo projeto.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Ver Portfólio <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
