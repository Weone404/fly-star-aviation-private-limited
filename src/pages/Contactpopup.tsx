import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, X, LucideIcon } from "lucide-react";
import { saveContactEnquiry } from "@/lib/saveContactEnquiry";
import { useToast } from "@/hooks/use-toast";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ContactInfoItem {
    icon: LucideIcon;
    label: string;
    value: string;
    href: string;
}

interface FormData {
    name: string;
    phone: string;
    email: string;
    interest: string;
    message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const TABBABLE_SELECTOR = [
    "a[href]",
    "area[href]",
    "button",
    "input:not([type='hidden'])",
    "select",
    "textarea",
    "iframe",
    "object",
    "embed",
    "[contenteditable='true']",
    "[tabindex]",
].join(",");

function isAvailableInDialog(element: HTMLElement, dialog: HTMLElement): boolean {
    if (!element.isConnected || !dialog.contains(element) || element.matches(":disabled")) return false;

    for (let current: HTMLElement | null = element; current; current = current.parentElement) {
        if (
            current.hidden ||
            current.hasAttribute("inert") ||
            current.getAttribute("aria-hidden") === "true"
        ) {
            return false;
        }

        const style = window.getComputedStyle(current);
        if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") {
            return false;
        }

        if (current === dialog) break;
    }

    return true;
}

function getTabbableElements(dialog: HTMLElement): HTMLElement[] {
    return Array.from(dialog.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR))
        .map((element, index) => ({ element, index }))
        .filter(({ element }) => element.tabIndex >= 0 && isAvailableInDialog(element, dialog))
        .sort((a, b) => {
            const aIndex = a.element.tabIndex;
            const bIndex = b.element.tabIndex;
            if (aIndex > 0 && bIndex > 0) return aIndex - bIndex || a.index - b.index;
            if (aIndex > 0) return -1;
            if (bIndex > 0) return 1;
            return a.index - b.index;
        })
        .map(({ element }) => element);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const contactInfo: ContactInfoItem[] = [
    { icon: Phone, label: "Phone", value: "+91 99535 36199, 9953566619", href: "tel:+919953536199" },
    { icon: Mail, label: "Email", value: "info@flyingstaraviator.com", href: "mailto:info@flyingstaraviator.com" },
    { icon: MapPin, label: "Address", value: "C705, Sector 7, Block C Palam Extension, Dwarka, Delhi 110077", href: "#" },
    { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 6:00 PM", href: "#" },
];

const interestOptions: string[] = [
    "CPL - Commercial Pilot License",
    "PPL - Private Pilot License",
    "DGCA Exam Preparation",
    "Type Rating",
    "Other Services",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactPopup(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [saveFailed, setSaveFailed] = useState<boolean>(false);
    const [whatsappUrl, setWhatsappUrl] = useState<string>("");
    const [focused, setFocused] = useState<keyof FormData | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: "", phone: "", email: "", interest: interestOptions[0], message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    // Honeypot value. Always "" for a real visitor; bots fill it.
    const [honeypot, setHoneypot] = useState("");
    const { toast } = useToast();
    const launcherRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const focusReturnRef = useRef<HTMLButtonElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);
    const successHeadingRef = useRef<HTMLHeadingElement>(null);
    const wasOpenRef = useRef(false);
    const handleClose = (): void => { setIsOpen(false); };

    useEffect(() => {
        if (!isOpen) {
            if (wasOpenRef.current) {
                wasOpenRef.current = false;
                focusReturnRef.current?.focus();
                focusReturnRef.current = null;
                lastFocusedRef.current = null;
            }
            return;
        }

        wasOpenRef.current = true;
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusInside = (preferred?: HTMLElement | null): void => {
            const target = preferred && isAvailableInDialog(preferred, dialog)
                ? preferred
                : getTabbableElements(dialog)[0] ?? dialog;
            target.focus();
        };

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                event.preventDefault();
                handleClose();
                return;
            }
            if (event.key !== "Tab") return;

            const tabbable = getTabbableElements(dialog);
            const active = document.activeElement;
            const activeIndex = tabbable.indexOf(active as HTMLElement);

            if (!tabbable.length) {
                event.preventDefault();
                dialog.focus();
            } else if (activeIndex < 0) {
                event.preventDefault();
                (event.shiftKey ? tabbable[tabbable.length - 1] : tabbable[0]).focus();
            } else if (event.shiftKey && activeIndex === 0) {
                event.preventDefault();
                tabbable[tabbable.length - 1].focus();
            } else if (!event.shiftKey && activeIndex === tabbable.length - 1) {
                event.preventDefault();
                tabbable[0].focus();
            }
        };

        const handleFocusIn = (event: FocusEvent): void => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (dialog.contains(target) && isAvailableInDialog(target, dialog)) {
                if (target !== dialog) lastFocusedRef.current = target;
                return;
            }
            focusInside(lastFocusedRef.current);
        };

        const observer = new MutationObserver(() => {
            const active = document.activeElement;
            if (
                !(active instanceof HTMLElement) ||
                !isAvailableInDialog(active, dialog)
            ) {
                focusInside();
            }
        });

        observer.observe(dialog, {
            attributes: true,
            attributeFilter: ["aria-hidden", "class", "disabled", "hidden", "inert", "style", "tabindex"],
            childList: true,
            subtree: true,
        });
        document.addEventListener("keydown", handleKeyDown, true);
        document.addEventListener("focusin", handleFocusIn, true);
        focusInside();

        return () => {
            observer.disconnect();
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("focusin", handleFocusIn, true);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (submitted) {
            successHeadingRef.current?.focus();
            return;
        }
        const dialog = dialogRef.current;
        if (dialog) getTabbableElements(dialog)[0]?.focus();
    }, [isOpen, submitted]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(p => ({ ...p, [name]: "" }));
        }
    };

    const validate = (): FormErrors => {
        const e: FormErrors = {};
        if (!formData.name.trim()) e.name = "Name is required";
        if (!formData.phone.trim()) e.phone = "Phone is required";
        else if (!/^[+\d\s()-]{7,15}$/.test(formData.phone)) e.phone = "Enter a valid phone number";
        if (!formData.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
        return e;
    };

    // ── Save to MongoDB via Vercel API route ─────────────────────────────────
    // ✅ FIX: Changed from `${import.meta.env.VITE_API_URL}/api/contact`
    //         to a relative URL "/api/contact" — same as the Contact page.
    //         The env variable was undefined/empty, causing the fetch to fail silently.
    const saveToMongoDB = async (): Promise<boolean> => {
        return saveContactEnquiry({
            ...formData,
            message: formData.message || "No additional message",
            company: honeypot,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const ve = validate();
        if (Object.keys(ve).length) { setErrors(ve); return; }

        setIsSubmitting(true);
        const saveSucceeded = await saveToMongoDB();
        setSaveFailed(!saveSucceeded);

        const { name, phone, email, interest, message } = formData;
        const text = `🛩️ *New Enquiry - Flying Star Aviator*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📧 *Email:* ${email}\n🎯 *Interested In:* ${interest}\n💬 *Message:* ${message || "No additional message"}\n\n_Sent via flyingstaraviator.com contact form_`;
        const waURL = `https://wa.me/919953536199?text=${encodeURIComponent(text)}`;
        setWhatsappUrl(waURL);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            const whatsappWindow = window.open(waURL, "_blank");
            if (!saveSucceeded) {
                toast({
                    title: "Your enquiry was not saved online",
                    description: "Use Open WhatsApp below and press Send to contact us.",
                    variant: "destructive",
                });
            } else if (!whatsappWindow) {
                toast({
                    title: "WhatsApp did not open",
                    description: "Use Open WhatsApp below to continue your enquiry.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Continue in WhatsApp",
                    description: "Press Send in WhatsApp to complete your enquiry.",
                });
            }
        }, 1200);
    };

    const handleReset = (): void => {
        setSubmitted(false);
        setSaveFailed(false);
        setWhatsappUrl("");
        setFormData({ name: "", phone: "", email: "", interest: interestOptions[0], message: "" });
        setIsOpen(false);
    };

    return (
        <>
            <style>{`
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --sky: #1a3a6b; --sky-deep: #0f2347; --sky-light: #2554a0;
          --gold: #f0a500; --gold-light: #fbbf24;
          --white: #ffffff; --offwhite: #f7f9fc;
          --muted: #6b7280; --border: #dde3ed;
          --success: #16a34a; --success-bg: #f0fdf4;
          --error: #dc2626; --wa: #25d366;
        }

        /* ── Demo shell ── */
        .fsa-demo {
          font-family: "Segoe UI Variable", "Segoe UI", sans-serif;
          min-height: 100vh;
          background: linear-gradient(140deg, var(--sky-deep) 0%, var(--sky) 55%, #1d4fa0 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; color: var(--white);
          position: relative; overflow: hidden;
        }
        .fsa-demo::before {
          content: '✈'; position: absolute;
          top: 12%; right: 8%; font-size: 160px;
          opacity: 0.04; transform: rotate(-18deg); pointer-events: none;
        }
        .fsa-demo-chip {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
          padding: 5px 14px; border-radius: 99px; color: rgba(255,255,255,0.65);
        }
        .fsa-demo-brand {
          font-family: 'Raleway', sans-serif; font-size: 13px;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); margin-bottom: 4px;
        }
        .fsa-demo-num {
          font-family: 'Raleway', sans-serif; font-size: 72px;
          font-weight: 800; line-height: 1; color: var(--white); transition: color 0.3s;
        }
        .fsa-demo-num.urgent { color: var(--gold); }
        .fsa-demo-hint { font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 0.06em; }
        .fsa-preview-btn {
          margin-top: 16px; padding: 12px 32px;
          background: var(--gold); border: none; border-radius: 6px;
          color: var(--sky-deep); font-family: 'Raleway', sans-serif;
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.1s;
        }
        .fsa-preview-btn:hover { background: var(--gold-light); transform: translateY(-1px); }
        .fsa-launcher {
          position: fixed; right: 20px; bottom: 20px; z-index: 40;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 18px; border: 0; border-radius: 999px;
          background: var(--wa); color: var(--white);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          font: 700 13px "Segoe UI", sans-serif; cursor: pointer;
        }
        .fsa-launcher:hover { background: #1dbc5a; }
        .fsa-launcher:focus-visible { outline: 3px solid var(--gold-light); outline-offset: 3px; }

        /* ── Overlay ── */
        .fsa-overlay {
          position: fixed; inset: 0;
          background: rgba(8, 20, 55, 0.82);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          z-index: 9999; display: flex;
          align-items: center; justify-content: center;
          padding: 16px;
          animation: fsaFadeIn 0.28s ease;
        }
        @keyframes fsaFadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── Modal ── */
        .fsa-modal {
          position: relative; width: 100%; max-width: 840px;
          background: var(--white); border-radius: 18px;
          overflow: hidden; display: grid;
          grid-template-columns: 270px 1fr;
          box-shadow: 0 40px 100px rgba(8,20,55,0.45);
          animation: fsaUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          max-height: 96vh;
        }
        @keyframes fsaUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── Sidebar ── */
        .fsa-sidebar {
          background: linear-gradient(170deg, var(--sky-deep) 0%, var(--sky) 100%);
          padding: 40px 26px 32px;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
        }
        .fsa-sidebar::after {
          content: '✈'; position: absolute;
          bottom: -18px; right: -24px;
          font-size: 150px; opacity: 0.055;
          transform: rotate(-12deg); pointer-events: none;
        }
        .fsa-sb-tag {
          font-family: 'Raleway', sans-serif; font-size: 10px;
          font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 8px;
        }
        .fsa-sb-title {
          font-family: 'Raleway', sans-serif; font-size: 21px;
          font-weight: 800; line-height: 1.25; color: var(--white); margin-bottom: 8px;
        }
        .fsa-sb-sub {
          font-size: 11.5px; color: rgba(255,255,255,0.5);
          line-height: 1.65; margin-bottom: 22px;
        }
        .fsa-sb-divider {
          width: 32px; height: 2.5px; border-radius: 2px;
          background: var(--gold); margin-bottom: 22px;
        }
        .fsa-info-list { display: flex; flex-direction: column; gap: 13px; flex: 1; }
        .fsa-info-item {
          display: flex; align-items: flex-start; gap: 10px; text-decoration: none;
        }
        .fsa-info-icon {
          width: 30px; height: 30px; flex-shrink: 0;
          background: rgba(255,255,255,0.08); border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .fsa-info-item:hover .fsa-info-icon { background: rgba(240,165,0,0.2); }
        .fsa-info-icon svg { width: 13px; height: 13px; color: var(--gold); }
        .fsa-info-lbl {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 2px;
        }
        .fsa-info-val { font-size: 11px; color: rgba(255,255,255,0.78); line-height: 1.45; }

        .fsa-sb-cta { margin-top: auto; padding-top: 22px; display: flex; flex-direction: column; gap: 8px; }
        .fsa-btn-call, .fsa-btn-wa {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 10px 12px; border-radius: 8px;
          font-family: 'Raleway', sans-serif; font-size: 12px;
          font-weight: 700; letter-spacing: 0.07em;
          text-decoration: none; border: none; cursor: pointer; transition: all 0.2s;
        }
        .fsa-btn-call {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18); color: var(--white);
        }
        .fsa-btn-call:hover { background: rgba(255,255,255,0.18); }
        .fsa-btn-wa { background: var(--wa); color: var(--white); }
        .fsa-btn-wa:hover { background: #1dbc5a; }

        /* ── Form panel ── */
        .fsa-panel {
          padding: 36px 34px 30px; overflow-y: auto; display: flex; flex-direction: column;
        }
        .fsa-close {
          position: absolute; top: 13px; right: 13px;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(0,0,0,0.07); border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s; color: var(--muted); z-index: 10;
        }
        .fsa-close:hover { background: rgba(0,0,0,0.14); color: #111; }
        .fsa-close svg { width: 15px; height: 15px; }

        .fsa-panel-tag {
          font-family: 'Raleway', sans-serif; font-size: 10px;
          font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--sky-light); margin-bottom: 4px;
        }
        .fsa-panel-title {
          font-family: 'Raleway', sans-serif; font-size: 22px;
          font-weight: 800; color: var(--sky-deep); line-height: 1.2; margin-bottom: 4px;
        }
        .fsa-panel-sub { font-size: 12px; color: var(--muted); margin-bottom: 20px; line-height: 1.55; }

        .fsa-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .fsa-field { margin-bottom: 12px; }
        .fsa-lbl {
          display: block; font-family: 'Raleway', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--sky-deep); margin-bottom: 5px; transition: color 0.2s;
        }
        .fsa-field.foc .fsa-lbl { color: var(--sky-light); }
        .fsa-req { color: var(--error); }
        .fsa-input, .fsa-textarea, .fsa-select {
          width: 100%; padding: 9px 12px;
          border: 1.5px solid var(--border); border-radius: 8px;
          background: var(--offwhite);
          font-family: 'Nunito', sans-serif; font-size: 13px; color: #111827;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          -webkit-appearance: none; appearance: none;
        }
        .fsa-input:focus, .fsa-textarea:focus, .fsa-select:focus {
          border-color: var(--sky-light);
          box-shadow: 0 0 0 3px rgba(37,84,160,0.1);
          background: var(--white);
        }
        .fsa-input.err, .fsa-textarea.err { border-color: var(--error); }
        .fsa-input::placeholder, .fsa-textarea::placeholder { color: #b5bfcc; }
        .fsa-textarea { height: 76px; resize: none; }
        .fsa-select { cursor: pointer; }
        .fsa-err-msg { font-size: 11px; color: var(--error); margin-top: 3px; }

        .fsa-wa-note {
          display: flex; align-items: flex-start; gap: 9px;
          background: #f0fdf4; border: 1px solid #bbf7d0;
          border-radius: 8px; padding: 9px 12px; margin-bottom: 14px;
        }
        .fsa-wa-note svg { width: 15px; height: 15px; color: var(--wa); flex-shrink: 0; margin-top: 1px; }
        .fsa-wa-note p { font-size: 11.5px; color: #166534; line-height: 1.5; }
        .fsa-wa-note strong { font-weight: 700; }

        .fsa-submit {
          width: 100%; padding: 13px 20px;
          background: linear-gradient(135deg, var(--sky-light) 0%, var(--sky-deep) 100%);
          border: none; border-radius: 8px; color: var(--white);
          font-family: 'Raleway', sans-serif; font-size: 13px;
          font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: opacity 0.2s, transform 0.12s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .fsa-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .fsa-submit:active:not(:disabled) { transform: scale(0.99); }
        .fsa-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .fsa-submit svg { width: 14px; height: 14px; }
        .fsa-spin {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          animation: spin 0.65s linear infinite; flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fsa-gold-stripe {
          height: 3px; margin-top: 10px; border-radius: 2px; width: 56px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
        }

        /* ── Success state ── */
        .fsa-success {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 20px 8px;
          animation: fsaFadeIn 0.38s ease;
        }
        .fsa-success-ring {
          width: 62px; height: 62px; border-radius: 50%;
          background: var(--success-bg); border: 2px solid #bbf7d0;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          animation: pop 0.42s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes pop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .fsa-success-ring svg { width: 26px; height: 26px; color: var(--success); }
        .fsa-success-h {
          font-family: 'Raleway', sans-serif; font-size: 20px;
          font-weight: 800; color: var(--sky-deep); margin-bottom: 6px;
        }
        .fsa-success-p { font-size: 12.5px; color: var(--muted); margin-bottom: 4px; line-height: 1.55; }
        .fsa-success-hint { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
        .fsa-success-hint strong { color: var(--sky-deep); }
        .fsa-reset {
          padding: 9px 22px; border-radius: 8px;
          border: 1.5px solid var(--border); background: var(--white);
          font-family: 'Raleway', sans-serif; font-size: 11px;
          font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--sky-deep); cursor: pointer; transition: all 0.2s;
        }
        .fsa-reset:hover { border-color: var(--sky-light); color: var(--sky-light); }

        @media (max-width: 620px) {
          .fsa-modal { grid-template-columns: 1fr; }
          .fsa-sidebar { display: none; }
          .fsa-panel { padding: 36px 20px 28px; }
          .fsa-row { grid-template-columns: 1fr; }
        }
      `}</style>

          <button
              ref={launcherRef}
              type="button"
              className="fsa-launcher"
              aria-haspopup="dialog"
              aria-controls="fsa-contact-dialog"
              aria-expanded={isOpen}
              onClick={() => {
                  focusReturnRef.current = launcherRef.current;
                  setIsOpen(true);
              }}
          >
              <MessageCircle size={16} />
              Enquire now
          </button>

          {/* ── Popup ── */}
          {isOpen && (
              <div className="fsa-overlay" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && handleClose()}>
                  <div
                      ref={dialogRef}
                      id="fsa-contact-dialog"
                      className="fsa-modal"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="fsa-contact-title"
                      tabIndex={-1}
                  >
                      <button type="button" className="fsa-close" aria-label="Close enquiry form" onClick={handleClose}><X /></button>

                        {/* Left sidebar */}
                        <div className="fsa-sidebar">
                            <p className="fsa-sb-tag">Flying Star Aviator</p>
                            <h2 className="fsa-sb-title">Start Your Aviation Journey</h2>
                            <p className="fsa-sb-sub">Expert counselors ready to guide your pilot career — one step at a time.</p>
                            <div className="fsa-sb-divider" />
                            <div className="fsa-info-list">
                                {contactInfo.map((item: ContactInfoItem) => (
                                    <a key={item.label} href={item.href} className="fsa-info-item">
                                        <div className="fsa-info-icon"><item.icon size={13} /></div>
                                        <div>
                                            <p className="fsa-info-lbl">{item.label}</p>
                                            <p className="fsa-info-val">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="fsa-sb-cta">
                                <a href="tel:+919953536199" className="fsa-btn-call">
                                    <Phone size={13} /> Call Now
                                </a>
                                <a href="https://wa.me/919953536199" target="_blank" rel="noopener noreferrer" className="fsa-btn-wa">
                                    <MessageCircle size={13} /> WhatsApp Us
                                </a>
                            </div>
                        </div>

                        {/* Right form panel */}
                        <div className="fsa-panel">
                            {submitted ? (
                                <div className="fsa-success">
                                    <div className="fsa-success-ring">
                                        {saveFailed ? <MessageCircle /> : <CheckCircle />}
                                    </div>
                                    <h3 ref={successHeadingRef} id="fsa-contact-title" className="fsa-success-h" tabIndex={-1}>Continue in WhatsApp</h3>
                                    {saveFailed ? (
                                        <p className="fsa-success-p" role="alert" style={{ color: "var(--error)" }}>
                                            We could not save your enquiry online. WhatsApp is still available; press Send there to contact us.
                                        </p>
                                    ) : (
                                        <p className="fsa-success-p">Your details are ready in WhatsApp.</p>
                                    )}
                                    <p className="fsa-success-hint">Just press <strong>Send</strong> to complete your enquiry.</p>
                                    <a className="fsa-reset" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        Open WhatsApp
                                    </a>
                                    <button className="fsa-reset" onClick={handleReset}>Submit Another Enquiry</button>
                                </div>
                            ) : (
                                <>
                                    <p className="fsa-panel-tag">✈ Get in touch</p>
                                    <h2 id="fsa-contact-title" className="fsa-panel-title">Send Us a Message</h2>
                                    <p className="fsa-panel-sub">
                                        Fill out the form — your details will be sent directly to our WhatsApp for a faster response.
                                    </p>

                                    <form onSubmit={handleSubmit} noValidate>
                                        {/* Honeypot — hidden from people, filled by bots. The server
                                            discards any submission where this arrives non-empty.
                                            See backend/enquiryGuard.js. Not display:none, which some
                                            bots detect; positioned off-screen and hidden from a11y. */}
                                        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                                          <label htmlFor="fsa-company-popup">Company (leave blank)</label>
                                          <input
                                            id="fsa-company-popup"
                                            type="text"
                                            name="company"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                          />
                                        </div>

                                        {/* Name + Phone */}
                                        <div className="fsa-row">
                                            <div className={`fsa-field ${focused === "name" ? "foc" : ""}`}>
                                                <label className="fsa-lbl">
                                                    Full Name <span className="fsa-req">*</span>
                                                </label>
                                                <input
                                                    className={`fsa-input ${errors.name ? "err" : ""}`}
                                                    name="name" placeholder="Rahul Sharma"
                                                    value={formData.name} onChange={handleChange}
                                                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                                                />
                                                {errors.name && <p className="fsa-err-msg">{errors.name}</p>}
                                            </div>
                                            <div className={`fsa-field ${focused === "phone" ? "foc" : ""}`}>
                                                <label className="fsa-lbl">
                                                    Phone <span className="fsa-req">*</span>
                                                </label>
                                                <input
                                                    className={`fsa-input ${errors.phone ? "err" : ""}`}
                                                    name="phone" type="tel" placeholder="+91 XXXXX XXXXX"
                                                    value={formData.phone} onChange={handleChange}
                                                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                                                />
                                                {errors.phone && <p className="fsa-err-msg">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className={`fsa-field ${focused === "email" ? "foc" : ""}`}>
                                            <label className="fsa-lbl">
                                                Email <span className="fsa-req">*</span>
                                            </label>
                                            <input
                                                className={`fsa-input ${errors.email ? "err" : ""}`}
                                                name="email" type="email" placeholder="rahul@email.com"
                                                value={formData.email} onChange={handleChange}
                                                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                                            />
                                            {errors.email && <p className="fsa-err-msg">{errors.email}</p>}
                                        </div>

                                        {/* Interested In */}
                                        <div className={`fsa-field ${focused === "interest" ? "foc" : ""}`}>
                                            <label className="fsa-lbl">Interested In</label>
                                            <select
                                                className="fsa-select" name="interest"
                                                value={formData.interest} onChange={handleChange}
                                                onFocus={() => setFocused("interest")} onBlur={() => setFocused(null)}
                                            >
                                                {interestOptions.map((opt: string) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className={`fsa-field ${focused === "message" ? "foc" : ""}`}>
                                            <label className="fsa-lbl">
                                                Message{" "}
                                                <span style={{ color: "var(--muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                                                    (optional)
                                                </span>
                                            </label>
                                            <textarea
                                                className="fsa-textarea" name="message"
                                                placeholder="Tell us about your aviation goals, experience, or any questions..."
                                                value={formData.message} onChange={handleChange}
                                                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                                            />
                                        </div>

                                        {/* WhatsApp note */}
                                        <div className="fsa-wa-note">
                                            <MessageCircle />
                                            <p>
                                                Your details will open in <strong>WhatsApp</strong> pre-filled — just press{" "}
                                                <strong>Send</strong> to reach us instantly.
                                            </p>
                                        </div>

                                        <button type="submit" className="fsa-submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <><div className="fsa-spin" /> Preparing WhatsApp...</>
                                            ) : (
                                                <><Send /> Send via WhatsApp</>
                                            )}
                                        </button>
                                        <div className="fsa-gold-stripe" />
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}