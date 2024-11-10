"use server";

import { IProperty } from "@/interface/property";
// import { revalidatePath } from "next/cache";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProperties(): Promise<IProperty[]> {
  try {
    const response = await fetch(`${url}/property/all-properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching to always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    const result = await response.json();
    // revalidatePath("/properties");
    return result.data.properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function getProperty(id: string): Promise<IProperty | null> {
  try {
    const response = await fetch(`${url}/property/get-property/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.success && data.data) {
      return data.data as IProperty;
    } else {
      console.error("Property not found or invalid response structure");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    return null;
  }
}
