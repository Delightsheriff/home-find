import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";

interface ProfileHeaderProps {
  user: Partial<User>;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>Profile Page</CardTitle>
      <h1 className="font-bold text-xl">
        Welcome{" "}
        <span className="uppercase font-bold">{user?.firstName} 👋</span>
      </h1>
      <CardDescription>Manage your account settings</CardDescription>
    </CardHeader>
  );
}
