import { User, Session, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const url = process.env.NEXT_PUBLIC_API_URL;

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
        const res = await fetch(`${url}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const response = await res.json();

        if (res.ok && response.statusText === "success") {
          const { user, session }: { user: User; session: Session } =
            response.data;
          const expiresAt = Date.now() + 15 * 60 * 1000;
          console.log("Token expires at:", new Date(expiresAt).toISOString());

          return {
            ...user,
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            accessTokenExpires: expiresAt, // 15 minutes
          };
        }
        return null; // Return null if the login failed
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT & { accessTokenExpires?: number };
      user: User;
    }) {
      // Initial sign-in
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // Refresh the access token if it has expired
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        // console.log(
        //   "Token expired at:",
        //   new Date(token.accessTokenExpires).toISOString(),
        // );
        // console.log("Current time:", new Date(Date.now()).toISOString());
        // console.log("Token Expired");
        const refreshedTokens = await refreshAccessToken(token);
        return {
          ...token,
          ...refreshedTokens,
        };
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { user?: User };
    }) {
      // Attach the access and refresh tokens to the session
      if (token.user) {
        session.user = token.user;
      }
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = token.user as User;
      return session;
    },
  },
  session: {
    strategy: "jwt",
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

    if (!res.ok || refreshedTokens.statusText !== "success")
      throw refreshedTokens;
    console.log("Token Refreshed successfully");
    return {
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // New 15-minute expiration time
      refreshToken: token.refreshToken, // Keep the refresh token if it’s still valid for 7 days
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
