// import PropertyDetails from "@/components/Property/PropertyDetails";
// import { fetchProperties, getProperty } from "@/lib/property";
// import { unstable_noStore as noStore } from "next/cache";
// import { notFound } from "next/navigation";
// import React from "react";

// export async function generateStaticParams() {
//   noStore(); // Disable Next.js caching for this component
//   const properties = await fetchProperties();

//   const ids = properties.map((property) => ({
//     PropertyId: String(property._id),
//   }));

//   return ids;
// }

// interface Pageprops {
//   params: { propertyId: string };
// }

// const Page: React.FC<Pageprops> = async ({ params }) => {
//   noStore(); // Disable Next.js caching for this component
//   const property = await getProperty(params.propertyId);
//   if (!property) notFound();
//   return <PropertyDetails property={property} />;
// };

// export default Page;

import PropertyDetails from "@/components/Property/PropertyDetails";
import { fetchProperties, getProperty } from "@/lib/property";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

// Import Next.js page types
import { Metadata } from "next";

export async function generateStaticParams() {
  noStore();
  const properties = await fetchProperties();

  return properties.map((property) => ({
    propertyId: String(property._id),
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { propertyId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  noStore();
  const property = await getProperty(params.propertyId);
  if (!property) notFound();
  return <PropertyDetails property={property} />;
}

// Optionally add metadata
export async function generateMetadata({
  params,
}: {
  params: { propertyId: string };
}): Promise<Metadata> {
  const property = await getProperty(params.propertyId);

  return {
    title: property?.title || "Property Details",
  };
}
