"use server";

import { EmailSchema, ResendVerificationEmailState } from "@/lib/definitions";
import { z } from "zod";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function resendVerificationEmail(
  prevState: ResendVerificationEmailState,
  formData: FormData,
): Promise<ResendVerificationEmailState> {
  try {
    const email = formData.get("email");
    const validatedFields = EmailSchema.parse({ email });

    const response = await fetch(`${url}/auth/resend-verification-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields),
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
      message: result.message || "Verification email sent successfully",
    };
  } catch (error) {
    // console.error("Resend verification error:", error);

    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid email address" };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }

    return { success: false, message: "An unexpected error occurred" };
  }
}
