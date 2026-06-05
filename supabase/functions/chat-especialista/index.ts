import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const API_URL = "https://chatbot-especialista-tapecaria.onrender.com/chatbot";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const respostas = Array.isArray(body?.respostas) ? body.respostas : [];

    // Validação simples: apenas strings curtas
    const safe = respostas
      .filter((r: unknown): r is string => typeof r === "string")
      .map((r: string) => r.slice(0, 100))
      .slice(0, 50);

    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respostas: safe }),
    });

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message || "Erro ao consultar o assistente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
