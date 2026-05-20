import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <div
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg animate-fade-in cursor-default"
    >
      <MessageCircle size={22} fill="currentColor" />
      <span className="text-sm font-medium hidden sm:inline">Fale pelo WhatsApp</span>
    </div>
  );
};

export default WhatsAppButton;
