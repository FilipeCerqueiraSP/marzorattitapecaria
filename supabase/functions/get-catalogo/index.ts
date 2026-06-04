import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { MongoClient } from "npm:mongodb@6.10.0";

const MONGODB_URI = Deno.env.get("MONGODB_URI");

let cachedClient: MongoClient | null = null;
async function getClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  cachedClient = client;
  return client;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!MONGODB_URI) {
      return new Response(
        JSON.stringify({ error: "MONGODB_URI não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const client = await getClient();
    const db = client.db("dadosmarzorati");
    const docs = await db.collection("produto").find({}).limit(500).toArray();

    const items = docs.map((d: any) => ({
      id: String(d._id),
      name: d.nome ?? d.name ?? d.tipo_movel ?? "Produto",
      tipo_movel: d.tipo_movel ?? null,
      tecido: d.tecido ?? null,
      cor: d.cor ?? null,
      segmento: d.segmento ?? d.segmentos ?? null,
      foto: d.foto ?? d.imagem ?? d.image ?? null,
      descricao: d.descricao ?? null,
    }));

    return new Response(JSON.stringify({ items }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("get-catalogo error:", err);
    return new Response(
      JSON.stringify({ error: String((err as Error)?.message ?? err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
