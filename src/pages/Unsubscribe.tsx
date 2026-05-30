import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    const validate = async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
        const res = await fetch(url, {
          headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string },
        });
        const data = await res.json();
        if (res.ok && data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setStatus("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") setStatus("success");
      else {
        setErrorMsg(data?.error || "Não foi possível processar.");
        setStatus("error");
      }
    } catch (e: any) {
      setErrorMsg(e?.message || "Erro inesperado");
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="stitch-border p-8 bg-card text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4">
              {status === "loading" || status === "submitting" ? (
                <Loader2 className="animate-spin" size={26} />
              ) : status === "success" || status === "already" ? (
                <CheckCircle2 size={26} />
              ) : status === "invalid" || status === "error" ? (
                <AlertCircle size={26} />
              ) : (
                <Mail size={26} />
              )}
            </div>

            <h1 className="font-heading text-2xl font-bold text-primary mb-2">
              Cancelar inscrição
            </h1>
            <div className="stitch-line max-w-[120px] mx-auto my-3" />

            {status === "loading" && (
              <p className="text-muted-foreground text-sm">Validando...</p>
            )}

            {status === "valid" && (
              <>
                <p className="text-muted-foreground text-sm mb-6">
                  Confirme para deixar de receber emails da Tapeçaria Marzorati.
                </p>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-accent text-accent-foreground py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  Confirmar cancelamento
                </button>
              </>
            )}

            {status === "submitting" && (
              <p className="text-muted-foreground text-sm">Processando...</p>
            )}

            {status === "success" && (
              <p className="text-muted-foreground text-sm">
                Pronto! Você não receberá mais emails deste endereço.
              </p>
            )}

            {status === "already" && (
              <p className="text-muted-foreground text-sm">
                Este endereço já está cancelado.
              </p>
            )}

            {status === "invalid" && (
              <p className="text-muted-foreground text-sm">
                Link inválido ou expirado.
              </p>
            )}

            {status === "error" && (
              <p className="text-destructive text-sm">{errorMsg}</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Unsubscribe;
