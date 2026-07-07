import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";
import { KeywordLinkify } from "@/components/layout/KeywordLinkify";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <KeywordLinkify>{children}</KeywordLinkify>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
