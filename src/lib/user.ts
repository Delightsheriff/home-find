"use server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";

const url = process.env.NEXT_PUBLIC_API_URL;
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const userSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.string(),
  profileImageUrl: z.string().optional(),
});

const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB.",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp files are accepted.",
    ),
  user: userSchema,
});

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const userJson = formData.get("user") as string;
    const user = JSON.parse(userJson);
    console.log(user);

    const validatedFields = uploadSchema.parse({ file, user });

    const apiFormData = new FormData();
    apiFormData.append("file", validatedFields.file);
    apiFormData.append("user", JSON.stringify(validatedFields.user));

    console.log(apiFormData);

    const response = await fetch(`${url}/update-photo`, {
      method: "POST",
      body: apiFormData,
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return { success: true, imageUrl: data.url };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to upload image" };
  }
}

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
    console.log(updatedData);
    return { success: true, data: updatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to update profile" };
  }
}
