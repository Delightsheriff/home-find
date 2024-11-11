import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>Manage your entire system</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Admin-specific content goes here</p>
      </CardContent>
    </Card>
  );
}
