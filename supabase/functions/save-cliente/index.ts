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

    const body = await req.json().catch(() => ({}));
    const nome = String(body?.nome ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const telefone = String(body?.telefone ?? "").trim();
    const tipo_cliente = String(body?.tipo_cliente ?? "").trim();
    const mensagem = String(body?.mensagem ?? "").trim();

    if (!nome || nome.length > 200) {
      return new Response(JSON.stringify({ error: "Nome inválido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (tipo_cliente && !["CPF", "CNPJ"].includes(tipo_cliente)) {
      return new Response(JSON.stringify({ error: "tipo_cliente inválido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (mensagem.length > 5000 || telefone.length > 40) {
      return new Response(JSON.stringify({ error: "Campos muito longos" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const client = await getClient();
    const db = client.db("dadosmarzorati");
    const result = await db.collection("Cliente").insertOne({
      Nome: nome,
      email,
      telefone,
      tipo_cliente,
      mensagem,
      created_at: new Date(),
    });

    return new Response(JSON.stringify({ ok: true, id: String(result.insertedId) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("save-cliente error:", err);
    return new Response(
      JSON.stringify({ error: String((err as Error)?.message ?? err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
