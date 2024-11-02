"use client";
import { useSession } from "next-auth/react";
import Header from "./Header";

export default function HeaderWrapper() {
  const { data: session } = useSession();
  return <Header session={session} />;
}
