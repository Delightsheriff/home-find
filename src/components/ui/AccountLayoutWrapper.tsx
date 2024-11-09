// components/AccountLayoutWrapper.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AccountLayout from "@/app/account/layout";
// import AccountLayout from "./AccountLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayoutWrapper({ children }: LayoutProps) {
  const session = await getServerSession(authOptions); // Fetch the session on the server

  return <AccountLayout session={session}>{children}</AccountLayout>;
}
