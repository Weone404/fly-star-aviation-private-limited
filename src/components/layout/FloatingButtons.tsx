import { Phone, MessageCircle } from "lucide-react";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a
        href="https://wa.me/919953536199?text=Hi, I'm interested in pilot training"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <a
        href="tel:+919953536199"
        aria-label="Call Flying Star Aviator"
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
