// "use server";
// import { SignInData, SignInSchema } from "@/lib/definitions";
// import { z } from "zod";

// const url = process.env.NEXT_PUBLIC_API_URL;

// // export const signIn = async (
// //   formData: FormData,
// //   callbackUrl?: string | undefined,
// // ) => {
// //   try {
// //     const rawData: SignInData = {
// //       email: formData.get("email") as string,
// //       password: formData.get("password") as string,
// //     };
// //     // Validate form data using the Zod schema
// //     const validatedFields = SignInSchema.parse(rawData);
// //     // Send the sign-in request
// //     const response = await fetch(`${url}/auth/signin`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(validatedFields),
// //     });
// //     const result = await response.json();
// //     if (!response.ok) {
// //       throw new Error(
// //         result?.message ||
// //           `Server error: ${response.status} ${response.statusText}`,
// //       );
// //     }
// //     // Check if the sign-in was successful
// //     if (result.statusText === "success") {
// //       return {
// //         success: true,
// //         message: result.message || "Sign in successful",
// //         data: result.data,
// //         redirectUrl: callbackUrl || "/account", // Redirect to callbackUrl or account page after login
// //       };
// //     } else {
// //       throw new Error(result.message || "Sign in failed");
// //     }
// //   } catch (error) {
// //     if (error instanceof z.ZodError) {
// //       return { success: false, errors: error.errors };
// //     }
// //     if (error instanceof Error) {
// //       return {
// //         success: false,
// //         message: error.message || "An unexpected error occurred",
// //       };
// //     }
// //     return { success: false, message: "An unexpected error occurred" };
// //   }
// // };

// import { NextAuthOptions, Session, User } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import CredentialsProvider from "next-auth/providers/credentials";

// const url = process.env.NEXT_PUBLIC_API_URL;

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       id: "login",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<User | null> {
//         try {
//           const response = await fetch(`${url}/auth/signin`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(credentials),
//             credentials: "include",
//           });
//           const result = await response.json();
//           if (!response.ok) {
//             throw new Error(
//               result?.message ||
//                 `Server error: ${response.status} ${response.statusText}`,
//             );
//           }
//           if (result.statusText === "success") {
//             return result.data.user as User;
//           } else {
//             return null;
//           }
//         } catch (error) {
//           console.error("Authentication error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({
//       token,
//       user,
//     }: {
//       token: JWT & { accessTokenExpires?: number };
//       user?: User;
//     }): Promise<JWT> {
//       if (user) {
//         token.user = user;
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//         token.accessTokenExpires = Date.now() + 5 * 60 * 1000;
//       }

//       // Check if the access token has expired
//       if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
//         return token;
//       }

//       // If expired, refresh the token
//       return refreshAccessToken(token);
//     },
//     async session({
//       session,
//       token,
//     }: {
//       session: Session;
//       token: JWT;
//     }): Promise<Session> {
//       session.user = token.user as User;
//       session.accessToken = token.accessToken as string;
//       session.refreshToken = token.refreshToken as string;
//       return session;
//     },
//   },
// };

// async function refreshAccessToken(token: JWT) {
//   try {
//     const response = await fetch(`${url}/auth/refresh-token`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refreshToken: token.refreshToken }),
//     });
//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.accessToken,
//       accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
//       refreshToken: refreshedTokens.refreshToken || token.refreshToken,
//     };
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     return { ...token, error: "RefreshAccessTokenError" };
//   }
// }
