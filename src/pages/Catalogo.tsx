import { useState } from "react";
import { Filter, Sofa, Armchair, BedDouble, Building2, Home as HomeIcon, Users } from "lucide-react";
import Layout from "@/components/Layout";
import sofaSuedeAreia from "@/assets/catalogo/sofa-suede-areia.jpg";
import poltronaVeludoTerracota from "@/assets/catalogo/poltrona-veludo-terracota.jpg";
import cabeceiraLinhoGrafite from "@/assets/catalogo/cabeceira-linho-grafite.jpg";
import puffCouroCaramelo from "@/assets/catalogo/puff-couro-caramelo.jpg";
import sofaChenilleOliva from "@/assets/catalogo/sofa-chenille-oliva.jpg";
import poltronaLinhoMarinho from "@/assets/catalogo/poltrona-linho-marinho.jpg";
import cabeceiraVeludoCreme from "@/assets/catalogo/cabeceira-veludo-creme.jpg";
import puffSuedeBordo from "@/assets/catalogo/puff-suede-bordo.jpg";

type Segment = "todos" | "corporativo" | "domestico";
type Category = "todos" | "sofas" | "poltronas" | "cabeceiras" | "puffs";
type FabricType = "todos" | "suede" | "linho" | "couro" | "veludo" | "chenille";

const segments: { key: Segment; label: string; sublabel: string; icon: React.ElementType }[] = [
  { key: "todos", label: "Todos", sublabel: "Ver tudo", icon: Users },
  { key: "corporativo", label: "Corporativo", sublabel: "CNPJ", icon: Building2 },
  { key: "domestico", label: "Doméstico", sublabel: "CPF", icon: HomeIcon },
];


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

type Item = {
  id: number;
  name: string;
  category: Exclude<Category, "todos">;
  fabric: Exclude<FabricType, "todos">;
  color: string;
  image: string;
  segments: Exclude<Segment, "todos">[];
};

const placeholderItems: Item[] = [
  { id: 1, name: "Sofá Toscana 3 lugares", category: "sofas", fabric: "suede", color: "Areia", image: sofaSuedeAreia, segments: ["domestico", "corporativo"] },
  { id: 2, name: "Poltrona Bordeaux", category: "poltronas", fabric: "veludo", color: "Terracota", image: poltronaVeludoTerracota, segments: ["corporativo"] },
  { id: 3, name: "Cabeceira Capitonê Grafite", category: "cabeceiras", fabric: "linho", color: "Grafite", image: cabeceiraLinhoGrafite, segments: ["domestico"] },
  { id: 4, name: "Puff Redondo Caramelo", category: "puffs", fabric: "couro", color: "Caramelo", image: puffCouroCaramelo, segments: ["domestico", "corporativo"] },
  { id: 5, name: "Sofá Milano 2 lugares", category: "sofas", fabric: "chenille", color: "Oliva", image: sofaChenilleOliva, segments: ["domestico"] },
  { id: 6, name: "Poltrona Wing Clássica", category: "poltronas", fabric: "linho", color: "Marinho", image: poltronaLinhoMarinho, segments: ["corporativo", "domestico"] },
  { id: 7, name: "Cabeceira Ripada Creme", category: "cabeceiras", fabric: "veludo", color: "Creme", image: cabeceiraVeludoCreme, segments: ["domestico"] },
  { id: 8, name: "Puff Quadrado Bordô", category: "puffs", fabric: "suede", color: "Bordô", image: puffSuedeBordo, segments: ["corporativo"] },
];

const Catalogo = () => {
  const [activeSegment, setActiveSegment] = useState<Segment>("todos");
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [activeFabric, setActiveFabric] = useState<FabricType>("todos");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const filteredItems = placeholderItems.filter((item) => {
    if (activeSegment !== "todos" && !item.segments.includes(activeSegment)) return false;
    if (activeCategory !== "todos" && item.category !== activeCategory) return false;
    if (activeFabric !== "todos" && item.fabric !== activeFabric) return false;
    if (selectedColor && item.color !== selectedColor) return false;
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

          {/* Segment selector: Corporativo (CNPJ) / Doméstico (CPF) */}
          <div className="mb-10">
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Selecione o perfil de atendimento
              </span>
              <div
                role="tablist"
                aria-label="Perfil de atendimento"
                className="inline-flex flex-wrap justify-center gap-1 p-1 bg-muted/60 stitch-border-light rounded-lg"
              >
                {segments.map((seg) => {
                  const Icon = seg.icon;
                  const active = activeSegment === seg.key;
                  return (
                    <button
                      key={seg.key}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveSegment(seg.key)}
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                        active
                          ? "bg-card text-primary shadow-sm ring-1 ring-accent/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                      }`}
                    >
                      <Icon size={16} className={active ? "text-accent" : ""} />
                      <span className="flex flex-col items-start leading-tight">
                        <span>{seg.label}</span>
                        <span className={`text-[10px] uppercase tracking-wider ${active ? "text-accent" : "text-muted-foreground/80"}`}>
                          {seg.sublabel}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground max-w-md text-center">
                {activeSegment === "corporativo"
                  ? "Peças e acabamentos para hotelaria, escritórios, cenografia e produções — emissão de NF e atendimento CNPJ."
                  : activeSegment === "domestico"
                  ? "Móveis sob medida e reformas para a sua casa, com consultoria de tecidos e cores."
                  : "Mostrando todas as peças disponíveis para os dois perfis de atendimento."}
              </p>
            </div>
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
                      <div className="aspect-[4/3] bg-muted overflow-hidden">
                        <img
                          src={item.image}
                          alt={`${item.name} - ${item.color}`}
                          loading="lazy"
                          width={800}
                          height={640}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-semibold text-primary">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {categories.find(c => c.key === item.category)?.label}, {fabricTypes.find(f => f.key === item.fabric)?.label}, {item.color}
                        </p>
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
