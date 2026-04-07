import { useState } from "react";
import { Filter, Sofa, Armchair, BedDouble, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";

type Category = "todos" | "sofas" | "poltronas" | "cabeceiras" | "puffs";
type FabricType = "todos" | "suede" | "linho" | "couro" | "veludo" | "chenille";

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "todos", label: "Todos", icon: Filter },
  { key: "sofas", label: "Sofás", icon: Sofa },
  { key: "poltronas", label: "Poltronas", icon: Armchair },
  { key: "cabeceiras", label: "Cabeceiras", icon: BedDouble },
  { key: "puffs", label: "Puffs", icon: Sofa },
];

const fabricTypes: { key: FabricType; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "suede", label: "Suede" },
  { key: "linho", label: "Linho" },
  { key: "couro", label: "Couro Sintético" },
  { key: "veludo", label: "Veludo" },
  { key: "chenille", label: "Chenille" },
];

const colorSwatches = [
  { name: "Areia", hsl: "40 30% 80%" },
  { name: "Terracota", hsl: "15 55% 45%" },
  { name: "Grafite", hsl: "0 0% 30%" },
  { name: "Marinho", hsl: "220 40% 25%" },
  { name: "Oliva", hsl: "90 25% 40%" },
  { name: "Creme", hsl: "42 40% 92%" },
  { name: "Bordô", hsl: "350 50% 30%" },
  { name: "Caramelo", hsl: "30 50% 50%" },
];

const placeholderItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Modelo ${i + 1}`,
  category: categories[1 + (i % 4)].key,
  fabric: fabricTypes[1 + (i % 5)].key,
}));

const Catalogo = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [activeFabric, setActiveFabric] = useState<FabricType>("todos");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const filteredItems = placeholderItems.filter((item) => {
    if (activeCategory !== "todos" && item.category !== activeCategory) return false;
    if (activeFabric !== "todos" && item.fabric !== activeFabric) return false;
    return true;
  });

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">
              Catálogo Virtual
            </h1>
            <div className="stitch-line max-w-xs mx-auto my-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore nossos modelos, tecidos e cores. Os dados reais serão integrados com o banco de dados em breve.
            </p>
            <span className="inline-block mt-2 text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
              Dados de exemplo — MongoDB em breve
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filters */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Category filter */}
              <div className="stitch-border p-5 bg-card">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Filter size={18} /> Tipo de Móvel
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        activeCategory === cat.key
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground/70 hover:bg-muted"
                      }`}
                    >
                      <cat.icon size={16} />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric filter */}
              <div className="stitch-border p-5 bg-card">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                  Tecido
                </h3>
                <div className="space-y-1">
                  {fabricTypes.map((fb) => (
                    <button
                      key={fb.key}
                      onClick={() => setActiveFabric(fb.key)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        activeFabric === fb.key
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground/70 hover:bg-muted"
                      }`}
                    >
                      {fb.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color swatches */}
              <div className="stitch-border p-5 bg-card">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                  Cores
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {colorSwatches.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                      className={`group flex flex-col items-center gap-1 ${
                        selectedColor === color.name ? "scale-110" : ""
                      } transition-transform`}
                      title={color.name}
                    >
                      <span
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color.name
                            ? "border-accent shadow-md"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: `hsl(${color.hsl})` }}
                      />
                      <span className="text-[10px] text-muted-foreground">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {filteredItems.length === 0 ? (
                <div className="stitch-border-light p-12 text-center text-muted-foreground">
                  Nenhum item encontrado com os filtros selecionados.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="stitch-border-light bg-card overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                        <Sofa size={48} className="text-muted-foreground/30" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-semibold text-primary">
                          {item.name}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {categories.find(c => c.key === item.category)?.label}
                          </span>
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {fabricTypes.find(f => f.key === item.fabric)?.label}
                          </span>
                        </div>
                        <button className="mt-4 text-sm text-accent flex items-center gap-1 hover:gap-2 transition-all">
                          Ver detalhes <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalogo;
