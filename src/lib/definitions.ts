import { z } from "zod";

// Signup
export const SignupFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  role: z.enum(["tenant", "landlord"], {
    required_error: "Please select a role",
  }),
});

export type SignupFormData = z.infer<typeof SignupFormSchema>;

// email verification
export const EmailSchema = z.object({
  email: z.string().email(),
});

export type ResendVerificationEmailState = {
  success: boolean;
  message: string;
};

//sign in
export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInData = z.infer<typeof SignInSchema>;
