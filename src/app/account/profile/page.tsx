import ProfileHeader from "@/components/Account/Profile/profile-header";
import ProfileDetails from "@/components/Account/Profile/profile-details";
import { Card, CardContent } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  const user = session?.user;

  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <ProfileHeader user={user} />
      <CardContent className="space-y-6">
        {/* <ProfileImage user={user} /> */}
        <ProfileDetails user={user} />
      </CardContent>
    </Card>
  );
}
