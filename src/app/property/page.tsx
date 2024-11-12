import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";
import { fetchProperties } from "@/lib/property";
import PropertyListingClient from "@/components/Property/property-listing-client";
import { IProperty } from "@/interface/property";

export const metadata: Metadata = {
  title: "Property Listings",
};

export default async function PropertyPage() {
  noStore();

  const properties: IProperty[] = await fetchProperties();

  return (
    <div className="container mx-auto px-4">
      <PropertyListingClient initialProperties={properties} />
    </div>
  );
}
