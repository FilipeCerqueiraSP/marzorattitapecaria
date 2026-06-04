import { useState } from "react";
import { Instagram, Palette } from "lucide-react";
import Layout from "@/components/Layout";

const colorFilters = [
  { label: "Claro", value: "claro", color: "#f5f5dc" },
  { label: "Escuro", value: "escuro", color: "#2c2c2c" },
  { label: "Cinza", value: "cinza", color: "#808080" },
  { label: "Vermelho", value: "vermelho", color: "#e74c3c" },
  { label: "Rosa", value: "rosa", color: "#ff69b4" },
  { label: "Azul", value: "azul", color: "#3498db" },
  { label: "Verde", value: "verde", color: "#2ecc71" },
  { label: "Amarelo", value: "amarelo", color: "#f1c40f" },
  { label: "Marrom", value: "marrom", color: "#8b4513" },
  { label: "Roxo", value: "roxo", color: "#9b59b6" },
];

const Portfolio = () => {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">
              Portfólio
            </h1>
            <div className="stitch-line max-w-xs mx-auto my-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Conheça alguns dos nossos trabalhos sob medida.
            </p>
          </div>

          {/* Filtros de Cor */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Palette size={20} className="text-accent" />
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Filtros por Cor
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {colorFilters.map((cf) => (
                <button
                  key={cf.value}
                  onClick={() =>
                    setActiveColor(activeColor === cf.value ? null : cf.value)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeColor === cf.value
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-foreground border-border hover:border-accent/50"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: cf.color }}
                  />
                  {cf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Placeholder para galeria futura */}
          <div className="stitch-border-light bg-card p-12 text-center mb-16">
            <Palette size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="font-heading text-xl font-semibold text-primary mb-2">
              Galeria em construção
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              As fotos do portfólio serão carregadas em breve via integração com o banco de dados.
            </p>
            {activeColor && (
              <p className="mt-4 text-sm text-accent">
                Filtro selecionado: <span className="font-semibold capitalize">{activeColor}</span>
              </p>
            )}
          </div>

          {/* Instagram Feed — Behold.so */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Instagram size={20} className="text-accent" />
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Feed do Instagram
              </h2>
            </div>
            {/* @ts-expect-error behold-widget is a custom element */}
            <behold-widget feed-id="2QFGmcpOoNpu0bX3eQHM" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
