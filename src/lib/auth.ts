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
      token: JWT & {
        user?: User;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
      };
      user?: User;
      trigger?: "signUp" | "signIn" | "update";
    }) {
      //Handles session update
      if (trigger === "update") {
        console.log("Session update", user);
        console.log("Session update", token);
        return {
          ...token,
          user: {
            ...token.user,
            ...user,
          },
        };
      }

      // Initial sign-in
      // if (user) {
      //   token.user = user;
      //   token.accessToken = user.accessToken;
      //   token.refreshToken = user.refreshToken;
      //   token.accessTokenExpires = user.accessTokenExpires;
      // }
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
        const refreshedTokens = await refreshAccessToken(token);
        return {
          ...token,
          ...refreshedTokens,
          user: token.user,
        };
      }

      // Refresh the token if expired
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & {
        user?: User;
        accessToken?: string;
        refreshToken?: string;
      };
    }) {
      // Attach the access and refresh tokens to the session
      if (token.user) {
        session.user = token.user;
      }
      // session.accessToken = token.accessToken as string;
      // session.refreshToken = token.refreshToken as string;
      // session.user = token.user as User;
      session.accessToken = token.accessToken || "";
      session.refreshToken = token.refreshToken || "";

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        // Only make the request if we have an access token
        if (token.accessToken) {
          const response = await fetch(`${url}/auth/logout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          if (!response.ok) {
            console.error("Error during logout:", await response.text());
          }
        }
      } catch (error) {
        console.error("Error during logout:", error);
        // Continue with local signout even if server signout fails
      }
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
      user: token.user, // Preserve user data
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
      user: token.user, // Preserve user data even on error
    };
  }
}
