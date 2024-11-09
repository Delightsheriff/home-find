"use server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";

const url = process.env.NEXT_PUBLIC_API_URL;
// const MAX_FILE_SIZE = 5000000; // 5MB
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// const uploadSchema = z.object({
//   file: z
//     .instanceof(File)
//     .refine(
//       (file) => file.size <= MAX_FILE_SIZE,
//       "File size must be less than 5MB.",
//     )
//     .refine(
//       (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
//       "Only .jpg, .jpeg, .png and .webp files are accepted.",
//     ),
// });

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
});

export type ProfileUpdateData = z.infer<typeof profileSchema>;

export async function updateProfile(data: ProfileUpdateData) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: "You need to be signed in to update your profile",
    };
  }
  try {
    const validatedFields = profileSchema.parse(data);

    const response = await fetch(`${url}/user/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validatedFields),
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const updatedData = await response.json();
    return { success: true, data: updatedData.data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to update profile" };
  }
}

export async function uploadProfileImage(formData: FormData) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: "You need to be signed in to update your profile",
    };
  }

  try {
    const response = await fetch(`${url}/user/update-photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        // Remove any Content-Type header - let the browser set it
      },
      body: formData, // Use the original formData, not apiFormData
    });

    if (!response.ok) {
      const errorData = await response.text(); // Get error details if any
      console.error("Upload error:", errorData);
      throw new Error("Failed to upload image");
    }

    const updatedData = await response.json();
    return { success: true, data: updatedData.data };
  } catch (error) {
    console.error("Upload error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to upload image" };
  }
}
