import PropertyDialog from "@/components/Property/PropertyDialog";
import PropertyListings from "@/components/Property/PropertyListings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
        </CardHeader>
        <div className="w-full space-y-1.5 p-6 md:w-auto">
          <PropertyDialog />
        </div>
      </div>
      <CardContent>
        <PropertyListings />
      </CardContent>
    </Card>
  );
}
