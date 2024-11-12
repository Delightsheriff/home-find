"use server";

import { IProperty } from "@/interface/property";

import { propertySchema } from "./validations/property";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
// import { propertySchema } from "@/lib/validations/property";

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

export async function myProperties(): Promise<IProperty[]> {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You need to be signed in");
  }
  try {
    const response = await fetch(`${url}/property/my-property`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    const result = await response.json();
    return result.data.properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function createProperty(
  formData: FormData,
): Promise<{ errors?: Record<string, string[]> }> {
  console.log(formData);
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You need to be signed in");
  }
  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error("No access token found");
  }

  // Parse form data
  const rawFormData: Record<string, any> = {};
  const fileData = new FormData();

  // Handle images separately
  const imageFiles: File[] = [];

  for (const [key, value] of formData.entries()) {
    if (key === "images") {
      imageFiles.push(value as File);
      fileData.append("images", value as File);
    } else if (key === "ownershipDocument") {
      rawFormData.ownershipDocument = value;
      fileData.append("ownershipDocument", value as File);
    } else if (key === "amenities") {
      try {
        const amenitiesObj = JSON.parse(value as string);
        console.log(amenitiesObj);
        rawFormData.amenities = amenitiesObj; // Directly use the parsed amenities object
        fileData.append("amenities", value as string);
      } catch (error) {
        console.error("Error parsing amenities:", error);
        return {
          errors: {
            amenities: ["Invalid amenities data"],
          },
        };
      }
    } else if (
      ["bedrooms", "bathrooms", "toilets", "size", "slots", "price"].includes(
        key,
      )
    ) {
      rawFormData[key] = Number(value);
      fileData.append(key, value as string);
    } else {
      rawFormData[key] = value;
      fileData.append(key, value as string);
    }
  }

  // Add images array to rawFormData
  rawFormData.images = imageFiles;

  // Validate the parsed form data
  const validatedFields = propertySchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    const errors: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(
      validatedFields.error.flatten().fieldErrors,
    )) {
      errors[key] = value || [];
    }
    return { errors };
  }

  try {
    const response = await fetch(`${url}/property/post-property`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: fileData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {
          submit: [errorData.message || "Failed to create property"],
        },
      };
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error creating property:", error);
    return {
      errors: {
        submit: ["Failed to create property. Please try again."],
      },
    };
  }
}
