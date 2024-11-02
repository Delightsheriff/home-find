import { User, Session, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const url = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_EXPIRY_TIME = 15 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const res = await fetch(`${url}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const response = await res.json();

          if (!res.ok) {
            throw new Error(response.message || "Authentication failed");
          }

          if (response.statusText === "success") {
            const { user, session }: { user: User; session: Session } =
              response.data;
            const expiresAt = Date.now() + TOKEN_EXPIRY_TIME;

            return {
              ...user,
              accessToken: session.accessToken,
              refreshToken: session.refreshToken,
              accessTokenExpires: expiresAt,
            };
          }
          return null; // Return null if the login failed
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
    }: {
      token: JWT & { accessTokenExpires?: number; error?: string };
      user?: User;
      trigger?: "signUp" | "signIn" | "update";
    }) {
      //Handles session update
      if (trigger === "update") {
        return {
          ...token,
          user,
        };
      }

      // Initial sign-in
      if (user) {
        return {
          ...token,
          user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }
      // Return previous token if the access token has not expired
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Refresh the token if expired
      return await refreshAccessToken(token);
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { user?: User; error?: string };
    }) {
      if (token.error) {
        // Handle token refresh error
        throw new Error("RefreshAccessTokenError");
      }
      // Attach the access and refresh tokens to the session
      return {
        ...session,
        user: token.user || session.user,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        error: token.error,
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};

// Helper function to refresh the access token
async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(`${url}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    if (refreshedTokens.statusText !== "success") {
      throw new Error(refreshedTokens.message || "Token refresh failed");
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + TOKEN_EXPIRY_TIME,
      refreshToken: token.refreshToken, // Preserve existing refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
