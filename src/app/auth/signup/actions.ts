"use server";

import { SignupFormData, SignupFormSchema } from "@/lib/definitions";
import { z } from "zod";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function signUp(formData: FormData) {
  try {
    const rawData: SignupFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "tenant" | "landlord",
    };

    const validatedFields = SignupFormSchema.parse(rawData);

    const response = await fetch(`${url}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message ||
          `Server error: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "User signed up successfully",
      redirectUrl: `/auth/email?email=${encodeURIComponent(
        validatedFields.email,
      )}`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    if (error instanceof Error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }
    console.error("Unknown signup error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}