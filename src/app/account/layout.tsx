// layout.tsx
import AccountNav from "@/components/ui/AccountNav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="top-0 z-10 bg-background border-b border-border md:sticky">
        <AccountNav />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
