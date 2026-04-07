import { Instagram, Phone, Mail } from "lucide-react";

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
                <a href="#" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone size={16} /> (11) 0000-0000
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Mail size={16} /> contato@tapecaria.com
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Instagram size={16} /> @tapecaria.ipiranga
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-primary-foreground/20 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Tapeçaria Ipiranga. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
