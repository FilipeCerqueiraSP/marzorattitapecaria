import { Instagram, ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";

const placeholderPosts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  type: i < 6 ? "instagram" : "fixed",
}));

const Portfolio = () => {
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
              Conheça nossos trabalhos. As imagens abaixo serão integradas com o Instagram
              e atualizadas automaticamente.
            </p>
          </div>

          {/* Instagram Feed Section */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Instagram size={20} className="text-accent" />
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Feed do Instagram
              </h2>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full ml-2">
                Em breve — API
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {placeholderPosts.filter(p => p.type === "instagram").map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-muted stitch-border-light flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-secondary/50 transition-colors"
                >
                  <Instagram size={32} className="opacity-30" />
                  <span className="text-xs">Post #{post.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Images Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon size={20} className="text-accent" />
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Galeria de Destaques
              </h2>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full ml-2">
                Imagens a selecionar
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {placeholderPosts.filter(p => p.type === "fixed").map((post) => (
                <div
                  key={post.id}
                  className="aspect-[4/3] bg-muted stitch-border-light flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-secondary/50 transition-colors"
                >
                  <ImageIcon size={32} className="opacity-30" />
                  <span className="text-xs">Imagem destaque #{post.id - 6}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
