import { useState } from "react";
import { Send, Phone, Instagram, MessageCircle, MapPin } from "lucide-react";
import Layout from "@/components/Layout";

const Contato = () => {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — será integrado com envio de email
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">
              Contato
            </h1>
            <div className="stitch-line max-w-xs mx-auto my-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Entre em contato conosco. Responderemos o mais breve possível.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="stitch-border p-8 bg-card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                    <Send size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                    Mensagem enviada!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Entraremos em contato em breve.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ nome: "", email: "", telefone: "", mensagem: "" }); }}
                    className="mt-4 text-accent text-sm underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nome</label>
                    <input
                      type="text"
                      required
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Telefone</label>
                    <input
                      type="tel"
                      value={form.telefone}
                      onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="(11) 99999-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Mensagem</label>
                    <textarea
                      required
                      rows={4}
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                      placeholder="Descreva o que você precisa..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
                  >
                    <Send size={18} /> Enviar Mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="stitch-border-light p-6 bg-card">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                  Outras formas de contato
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/5511000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md bg-background hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <MessageCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">WhatsApp</span>
                      <p className="text-xs text-muted-foreground">(11) 00000-0000</p>
                    </div>
                  </a>

                  <a
                    href="tel:+551100000000"
                    className="flex items-center gap-3 p-3 rounded-md bg-background hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Telefone</span>
                      <p className="text-xs text-muted-foreground">(11) 0000-0000</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/tapecaria.ipiranga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-md bg-background hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Instagram size={20} className="text-pink-500" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Instagram</span>
                      <p className="text-xs text-muted-foreground">@tapecaria.ipiranga</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="stitch-border-light p-6 bg-card">
                <h3 className="font-heading text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <MapPin size={18} /> Localização
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bairro do Ipiranga, São Paulo — SP
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Endereço completo a ser adicionado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
