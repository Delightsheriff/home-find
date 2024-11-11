import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import Listings from "./Listings";
import { myProperties } from "@/lib/property";

//TODO: input the correct urland update
export default async function PropertyListings() {
  noStore();
  const properties = await myProperties();
  return (
    <>
      <Listings properties={properties} />
    </>
  );
}
