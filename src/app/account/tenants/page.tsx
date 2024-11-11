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
        <CardTitle>Tenants Page</CardTitle>
        <CardDescription>Manage your entire system</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Tenants-specific content goes here</p>
      </CardContent>
    </Card>
  );
}
