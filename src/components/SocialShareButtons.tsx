import { Facebook, Linkedin, MessageCircle } from "lucide-react";

export type SocialShareButtonTheme = "light" | "dark";

interface SocialShareButtonsProps {
  title?: string;
  className?: string;
  label?: string;
  theme?: SocialShareButtonTheme;
}

export function SocialShareButtons({
  title,
  className = "",
  label = "Share",
  theme = "light",
}: SocialShareButtonsProps) {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pageTitle =
    title ||
    (typeof document !== "undefined" ? document.title : "") ||
    "Check this out";

  if (!pageUrl) return null;

  const buttons = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      Icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      Icon: Linkedin,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`Check out ${pageTitle}: ${pageUrl}`)}`,
      Icon: MessageCircle,
    },
  ];

  const baseClasses =
    theme === "dark"
      ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
      : "border-border bg-white text-foreground hover:bg-muted";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {buttons.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            title={`Share on ${name}`}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-200 hover:-translate-y-0.5 ${baseClasses}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
