import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Catálogo", path: "/catalogo" },
  { label: "Contato", path: "/contato" },
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex flex-col items-start">
          <span className="font-heading text-2xl font-bold text-primary tracking-wide">
            Tapeçaria Marzorati
          </span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Estofados sob medida
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                location.pathname === item.path
                  ? "text-accent bg-accent/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-dashed border-stitch-light last:border-0 ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="stitch-line" />
    </header>
  );
};

export default Header;
