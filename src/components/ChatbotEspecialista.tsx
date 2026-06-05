import { useState } from "react";
import { Bot, X, Send, Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type FactName =
  | "reformar"
  | "móvel_novo"
  | "reformar_sofa"
  | "reformar_cadeira_poltrona_puff"
  | "tecido_desgastado"
  | "acento_afundando_molas_quebradas";

type Step = {
  id: FactName;
  pergunta: string;
  proximaSim: FactName | "FINAL";
  proximaNao: FactName | "FINAL";
};

// Árvore de decisão derivada do YAML
const FLUXO: Record<FactName, Step> = {
  reformar: {
    id: "reformar",
    pergunta: "Você quer reformar um móvel?",
    proximaSim: "reformar_sofa",
    proximaNao: "móvel_novo",
  },
  "móvel_novo": {
    id: "móvel_novo",
    pergunta: "Você quer um móvel novo sob medida?",
    proximaSim: "FINAL",
    proximaNao: "FINAL",
  },
  reformar_sofa: {
    id: "reformar_sofa",
    pergunta: "É um sofá?",
    proximaSim: "tecido_desgastado",
    proximaNao: "reformar_cadeira_poltrona_puff",
  },
  reformar_cadeira_poltrona_puff: {
    id: "reformar_cadeira_poltrona_puff",
    pergunta: "É uma cadeira, poltrona ou puff?",
    proximaSim: "tecido_desgastado",
    proximaNao: "FINAL",
  },
  tecido_desgastado: {
    id: "tecido_desgastado",
    pergunta: "Apenas o tecido está desgastado?",
    proximaSim: "acento_afundando_molas_quebradas",
    proximaNao: "acento_afundando_molas_quebradas",
  },
  acento_afundando_molas_quebradas: {
    id: "acento_afundando_molas_quebradas",
    pergunta: "O assento está afundando ou as molas quebraram?",
    proximaSim: "FINAL",
    proximaNao: "FINAL",
  },
};

type Mensagem =
  | { tipo: "bot"; texto: string }
  | { tipo: "user"; texto: string }
  | { tipo: "resultado"; diagnosticos: string[] };

const ChatbotEspecialista = () => {
  const [open, setOpen] = useState(false);
  const [stepAtual, setStepAtual] = useState<FactName | "FINAL">("reformar");
  const [fatos, setFatos] = useState<FactName[]>([]);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { tipo: "bot", texto: "Olá! Sou o assistente da Marzorati. Vou te fazer algumas perguntas para recomendar o melhor serviço. 😊" },
    { tipo: "bot", texto: FLUXO.reformar.pergunta },
  ]);
  const [carregando, setCarregando] = useState(false);

  const reiniciar = () => {
    setStepAtual("reformar");
    setFatos([]);
    setMensagens([
      { tipo: "bot", texto: "Vamos recomeçar! 🔄" },
      { tipo: "bot", texto: FLUXO.reformar.pergunta },
    ]);
  };

  const enviarParaAPI = async (fatosFinais: FactName[]) => {
    setCarregando(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-especialista", {
        body: { respostas: fatosFinais },
      });
      if (error) throw error;

      const diagnosticos: string[] = data?.diagnosticos ?? [];
      if (diagnosticos.length === 0) {
        setMensagens((m) => [
          ...m,
          {
            tipo: "bot",
            texto:
              "Não encontrei uma recomendação exata para esse caso. Entre em contato pelo WhatsApp que preparamos um atendimento personalizado para você!",
          },
        ]);
      } else {
        setMensagens((m) => [...m, { tipo: "resultado", diagnosticos }]);
      }
    } catch (err: unknown) {
      setMensagens((m) => [
        ...m,
        {
          tipo: "bot",
          texto: "Ops, tive um problema para consultar o sistema. Tente novamente em instantes ou fale pelo WhatsApp.",
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  const responder = (resposta: "sim" | "não") => {
    if (stepAtual === "FINAL" || carregando) return;

    const step = FLUXO[stepAtual];
    const novosFatos: FactName[] = resposta === "sim" ? [...fatos, step.id] : fatos;
    const proxima = resposta === "sim" ? step.proximaSim : step.proximaNao;

    setFatos(novosFatos);
    setMensagens((m) => [...m, { tipo: "user", texto: resposta === "sim" ? "Sim" : "Não" }]);

    if (proxima === "FINAL") {
      setStepAtual("FINAL");
      enviarParaAPI(novosFatos);
    } else {
      setStepAtual(proxima);
      setTimeout(() => {
        setMensagens((m) => [...m, { tipo: "bot", texto: FLUXO[proxima].pergunta }]);
      }, 300);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir assistente virtual"
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform animate-fade-in"
      >
        <Bot size={22} />
      </button>

      {/* Modal de chat */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 animate-fade-in">
          <div className="w-full sm:max-w-md h-[80vh] sm:h-[600px] bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Assistente Marzorati</h3>
                  <p className="text-xs opacity-80">Recomendação de serviços</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reiniciar}
                  aria-label="Reiniciar conversa"
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
              {mensagens.map((msg, i) => {
                if (msg.tipo === "user") {
                  return (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-tr-sm bg-accent text-accent-foreground text-sm">
                        {msg.texto}
                      </div>
                    </div>
                  );
                }
                if (msg.tipo === "bot") {
                  return (
                    <div key={i} className="flex justify-start">
                      <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-tl-sm bg-muted text-foreground text-sm">
                        {msg.texto}
                      </div>
                    </div>
                  );
                }
                // resultado
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-start">
                      <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-tl-sm bg-muted text-foreground text-sm">
                        Aqui está minha recomendação:
                      </div>
                    </div>
                    {msg.diagnosticos.map((d, j) => (
                      <div key={j} className="mx-2 p-3 rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20">
                        <p className="text-sm font-medium text-foreground">{d}</p>
                      </div>
                    ))}
                    <div className="flex flex-col gap-2 mt-2 px-2">
                      <a
                        href="https://wa.me/5511953678228?text=Olá!%20Usei%20o%20assistente%20do%20site%20e%20gostaria%20de%20mais%20informações."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-green-600 text-white text-sm py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Falar com a Marzorati no WhatsApp
                      </a>
                      <button
                        onClick={reiniciar}
                        className="w-full text-center border border-input bg-background text-foreground text-sm py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        Fazer nova consulta
                      </button>
                    </div>
                  </div>
                );
              })}

              {carregando && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl bg-muted text-muted-foreground text-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Analisando...
                  </div>
                </div>
              )}
            </div>

            {/* Botões de resposta */}
            {stepAtual !== "FINAL" && !carregando && (
              <div className="p-3 border-t border-border bg-card flex gap-2">
                <button
                  onClick={() => responder("sim")}
                  className="flex-1 py-2.5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Sim
                </button>
                <button
                  onClick={() => responder("não")}
                  className="flex-1 py-2.5 rounded-md border border-input bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  Não
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotEspecialista;
