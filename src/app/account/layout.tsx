"use client";
import AccountNav from "@/components/ui/AccountNav";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: LayoutProps) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="top-0 z-10 bg-background border-b border-border md:sticky">
          <AccountNav />
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}

// app/(protected)/account/layout.tsx

// export default function AccountLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//       <main>
//         {children}
//       </main>
//   );
// }
