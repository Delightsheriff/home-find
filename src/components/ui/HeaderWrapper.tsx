"use client";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Spinner from "./Spinner";

export default function HeaderWrapper() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Spinner />; // or return a skeleton component
  }
  return <Header session={session} />;
}
