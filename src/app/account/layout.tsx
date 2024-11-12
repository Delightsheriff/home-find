// "use client";
// import { SessionProvider } from "next-auth/react";
// import AccountNav from "@/components/ui/AccountNav";
// import { ReactNode } from "react";
// import { Session } from "next-auth";

// interface LayoutProps {
//   children: ReactNode;
//   session?: Session | null; // Add session prop
// }

// export default function AccountLayout({ children, session }: LayoutProps) {
//   return (
//     <SessionProvider session={session}>
//       <div className="flex flex-col min-h-screen bg-background">
//         <header className="top-0 z-10 bg-background border-b border-border md:sticky">
//           <AccountNav />
//         </header>

//         <main className="flex-grow container mx-auto px-4 py-8">
//           {children}
//         </main>
//       </div>
//     </SessionProvider>
//   );
// }

// app/account/layout.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AccountNav from "@/components/ui/AccountNav";
import { ReactNode } from "react";
import ClientSessionProvider from "@/components/ui/AccountLayoutWrapper";
// import ClientSessionProvider from "@/components/ui/ClientSessionProvider";

interface LayoutProps {
  children: ReactNode;
}

export default async function AccountLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <ClientSessionProvider session={session}>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="top-0 z-10 bg-background border-b border-border md:sticky">
          <AccountNav />
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ClientSessionProvider>
  );
}
