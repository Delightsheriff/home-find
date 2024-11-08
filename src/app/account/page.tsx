import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { navItems, UserRole } from "@/types/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/login");
  const userRole = session?.user?.role as UserRole | undefined;
  const filteredNavItems = navItems.filter(
    (item) => !userRole || item.roles.includes(userRole),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Your Account Dashboard</CardTitle>
        <CardDescription>
          Here&apos;s an overview of what you can do:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNavItems.map((item) => (
            <Link key={item.id} href={`/account/${item.id}`} passHref>
              <Card className="p-4 cursor-pointer hover:bg-accent">
                <div className="flex items-center space-x-4">
                  <item.icon className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      Click to view {item.label.toLowerCase()} details
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
