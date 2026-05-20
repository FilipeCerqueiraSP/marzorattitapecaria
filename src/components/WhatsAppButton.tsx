import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=5511953678228&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors animate-fade-in"
    >
      <MessageCircle size={22} fill="currentColor" />
      <span className="text-sm font-medium hidden sm:inline">Fale pelo WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
