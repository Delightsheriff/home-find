//next-auth.d.ts
import "next-auth";
// Type declarations for next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePictureUrl?: string;
      role: string;
      provider: string;
      isEmailVerified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl?: string;
    role: string;
    provider: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires?: number;
  }
}
