import { Instagram, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="stitch-line" />
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                Tapeçaria Marzorati
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Criação e restauração de móveis estofados com qualidade artesanal.
                Rua Vergueiro, 7724 - Vila Brasilio Machado, São Paulo - SP, 04273-100.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-3">Navegação</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="/portfolio" className="hover:text-primary-foreground transition-colors">Portfólio</a></li>
                <li><a href="/catalogo" className="hover:text-primary-foreground transition-colors">Catálogo</a></li>
                <li><a href="/contato" className="hover:text-primary-foreground transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-3">Contato</h4>
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <a href="tel:+551150584157" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone size={16} /> (11) 5058-4157
                </a>
                <a href="https://wa.me/5511953678228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <MessageCircle size={16} /> (11) 95367-8228
                </a>
                <a href="https://instagram.com/tapecaria.marzorati" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Instagram size={16} /> @tapecaria.marzorati
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-primary-foreground/20 text-center text-xs text-primary-foreground/50">
            <p>
              © {new Date().getFullYear()} Tapeçaria Marzorati. Todos os direitos reservados.{" "}
              <a href="/privacidade" className="hover:text-primary-foreground transition-colors underline underline-offset-2">Política de Privacidade</a>
              {" · "}
              <a href="/termos" className="hover:text-primary-foreground transition-colors underline underline-offset-2">Termos de Uso</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
