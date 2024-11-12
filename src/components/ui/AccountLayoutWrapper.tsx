// // components/AccountLayoutWrapper.tsx
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import AccountLayout from "@/app/account/layout";
// import { Session } from "next-auth";
// // import AccountLayout from "./AccountLayout";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export default async function AccountLayoutWrapper({ children }: LayoutProps) {
//   const session: Session | null = await getServerSession(authOptions); // Fetch the session on the server

//   return <AccountLayout session={session}>{children}</AccountLayout>;
// }

// app/account/ClientSessionProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface ClientSessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export default function ClientSessionProvider({
  children,
  session,
}: ClientSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
