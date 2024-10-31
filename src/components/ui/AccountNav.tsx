import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { navItems, UserRole } from "@/types/types";
import SignOutButton from "./SignOutButton";

export default async function AccountNav() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role as UserRole | undefined;
  const username = `${session?.user?.firstName || ""} ${
    session?.user?.lastName || ""
  }`.trim();

  const filteredNavItems = navItems.filter(
    (item) => !userRole || item.roles.includes(userRole),
  );

  return (
    <div className="container mx-auto px-4">
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 capitalize text-center py-2">
          Hello {username}
        </h1>
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
