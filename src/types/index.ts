export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  profilePictureUrl?: string;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpiresAt: Date | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  passwordResetAttempts: number;
  passwordChangedAt: Date;
  provider: string;
  googleId: string;
  refreshToken: string | null;
  propertiesToReview?: string[] | null; // New field for admin reviews
}
