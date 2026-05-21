import { Instagram, ImageIcon, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

type InstagramPost = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

const fixedPlaceholders = Array.from({ length: 3 }, (_, i) => i + 1);

const Portfolio = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["instagram-feed"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("instagram-feed", {
        body: null,
      });
      if (error) throw error;
      return (data?.data ?? []) as InstagramPost[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const posts = (data ?? []).slice(0, 9);

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
              Conheça nossos trabalhos. As imagens abaixo são atualizadas automaticamente
              a partir do nosso Instagram.
            </p>
          </div>

          {/* Instagram Feed Section */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Instagram size={20} className="text-accent" />
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Feed do Instagram
              </h2>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="animate-spin mr-2" size={20} />
                Carregando posts...
              </div>
            )}

            {isError && (
              <div className="py-12 text-center text-muted-foreground">
                Não foi possível carregar o feed agora. Tente novamente em instantes.
              </div>
            )}

            {!isLoading && !isError && posts.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                Nenhum post encontrado.
              </div>
            )}

            {!isLoading && !isError && posts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((post) => {
                  const src =
                    post.media_type === "VIDEO"
                      ? post.thumbnail_url ?? post.media_url
                      : post.media_url;
                  return (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group aspect-square overflow-hidden stitch-border-light bg-muted block"
                    >
                      <img
                        src={src}
                        alt={post.caption?.slice(0, 120) ?? "Post do Instagram"}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                  );
                })}
              </div>
            )}
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
              {fixedPlaceholders.map((n) => (
                <div
                  key={n}
                  className="aspect-[4/3] bg-muted stitch-border-light flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-secondary/50 transition-colors"
                >
                  <ImageIcon size={32} className="opacity-30" />
                  <span className="text-xs">Imagem destaque #{n}</span>
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
