import { useEffect } from "react";
import { Instagram, ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import destaque1 from "@/assets/destaque-1.png";
import destaque2 from "@/assets/destaque-2.png";
import destaque3 from "@/assets/destaque-3.png";
import destaque4 from "@/assets/destaque-4.png";
import destaque5 from "@/assets/destaque-5.png";
import destaque6 from "@/assets/destaque-6.png";

const destaques = [
  { src: destaque1, alt: "Pufes em formato de cogumelo personalizados" },
  { src: destaque2, alt: "Poltrona infantil estampada floral" },
  { src: destaque3, alt: "Poltrona temática com estampa floral" },
  { src: destaque4, alt: "Poltrona clássica com estrutura dourada" },
  { src: destaque5, alt: "Sofá modular cinza sob medida" },
  { src: destaque6, alt: "Banco curvo estofado em couro" },
];

const Portfolio = () => {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://w.behold.so/widget.js"]');
    if (!existing) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.appendChild(s);
    }
  }, []);

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

          <div>
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon size={20} className="text-accent" />
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Galeria de Destaques
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destaques.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden stitch-border-light bg-muted group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Instagram Feed — Behold.so */}
          <div className="mt-16">
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
