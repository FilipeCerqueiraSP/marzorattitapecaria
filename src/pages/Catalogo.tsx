import { useEffect, useState } from "react";
import { Filter, Sofa, Armchair, BedDouble, Building2, Home as HomeIcon, Users, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

type Segment = "todos" | "corporativo" | "domestico";
type Category = "todos" | "sofas" | "poltronas" | "cabeceiras" | "puffs";
type FabricType = "todos" | "suede" | "linho" | "couro" | "veludo" | "couro-sintetico";

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
  { key: "couro", label: "Couro" },
  { key: "veludo", label: "Veludo" },
  { key: "couro-sintetico", label: "Couro Sintético" },
];

const colorSwatches = [
  { name: "Claro", hsl: "40 20% 90%" },
  { name: "Escuro", hsl: "0 0% 15%" },
  { name: "Cinza", hsl: "0 0% 50%" },
  { name: "Vermelho", hsl: "0 70% 50%" },
  { name: "Rosa", hsl: "340 70% 75%" },
  { name: "Laranja", hsl: "25 90% 55%" },
  { name: "Azul", hsl: "220 70% 50%" },
  { name: "Verde", hsl: "120 50% 40%" },
  { name: "Amarelo", hsl: "50 90% 60%" },
  { name: "Marrom", hsl: "25 50% 30%" },
  { name: "Roxo", hsl: "270 60% 50%" },
  { name: "Colorido", hsl: "conic-gradient(from 0deg, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(0 100% 50%))", isGradient: true },
];

type Item = {
  id: string;
  name: string;
  tipo_movel: string | null;
  tecido: string | null;
  cor: string | null;
  segmento: string | string[] | null;
  foto: string | null;
  descricao?: string | null;
};

// Normalização: converte valores do banco em chaves dos filtros
const normalize = (s: unknown) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const toStringList = (v: unknown): string[] => {
  if (v == null) return [];
  if (Array.isArray(v)) return v.flatMap(toStringList);
  return String(v)
    .split(/[,;/|]/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const categoryFromTipo = (tipo: unknown): Category[] => {
  const parts = toStringList(tipo).map(normalize);
  const out = new Set<Category>();
  for (const n of parts) {
    if (n.includes("sofa")) out.add("sofas");
    if (n.includes("poltrona")) out.add("poltronas");
    if (n.includes("cabeceira")) out.add("cabeceiras");
    if (n.includes("puff")) out.add("puffs");
  }
  return [...out];
};

const fabricFromTecido = (tecido: unknown): FabricType[] => {
  const parts = toStringList(tecido).map(normalize);
  const out = new Set<FabricType>();
  for (const n of parts) {
    if (n.includes("sintetico")) out.add("couro-sintetico");
    else if (n.includes("couro")) out.add("couro");
    if (n.includes("suede")) out.add("suede");
    if (n.includes("linho")) out.add("linho");
    if (n.includes("veludo")) out.add("veludo");
  }
  return [...out];
};

const matchSegment = (seg: Item["segmento"], target: Exclude<Segment, "todos">) => {
  const list = toStringList(seg);
  if (list.length === 0) return true;
  const targetKey = target === "corporativo" ? "cnpj" : "cpf";
  const targetAlt = target === "corporativo" ? "corporativo" : "domestico";
  return list.map(normalize).some((s) => s.includes(targetKey) || s.includes(targetAlt));
};


const Catalogo = () => {
  const [activeSegment, setActiveSegment] = useState<Segment>("todos");
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [activeFabric, setActiveFabric] = useState<FabricType>("todos");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.functions.invoke("get-catalogo");
      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else {
        setItems((data?.items as Item[]) ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeSegment !== "todos" && !matchSegment(item.segmento, activeSegment)) return false;
    if (activeCategory !== "todos" && !categoryFromTipo(item.tipo_movel).includes(activeCategory)) return false;
    if (activeFabric !== "todos" && !fabricFromTecido(item.tecido).includes(activeFabric)) return false;

    if (selectedColor && normalize(item.cor ?? "") !== normalize(selectedColor)) return false;
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
              Explore nossos modelos, tecidos e cores.
            </p>
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
                  Cores <span className="text-xs font-normal text-muted-foreground">(tom aproximado)</span>
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
                        style={color.isGradient ? { background: color.hsl } : { backgroundColor: `hsl(${color.hsl})` }}
                      />
                      <span className="text-[10px] text-muted-foreground">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="stitch-border-light p-12 text-center text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> Carregando catálogo…
                </div>
              ) : error ? (
                <div className="stitch-border-light p-12 text-center text-destructive">
                  Erro ao carregar catálogo: {error}
                </div>
              ) : filteredItems.length === 0 ? (
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
                      {item.foto && (
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <img
                            src={item.foto}
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground">
                          {[item.tipo_movel, item.tecido, item.cor].filter(Boolean).join(" · ")}
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
