"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navItems, UserRole } from "@/types/types";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";

export default function AccountNav() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Spinner />; // You can replace this with a spinner or skeleton
  }
  const userRole = session?.user?.role as UserRole | undefined;

  const filteredNavItems = navItems.filter(
    (item) => !userRole || item.roles.includes(userRole),
  );

  return (
    <div className="container mx-auto px-4">
      <div className="py-4">
        <nav className="flex flex-wrap justify-center gap-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.id}
              href={`/account/${item.id}`}
              passHref
              className="mx-1 first:ml-0 last:mr-0 whitespace-nowrap"
            >
              <Button variant="ghost">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          <SignOutButton />
        </nav>
      </div>
    </div>
  );
}
