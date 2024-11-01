import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Adjust the import path as needed

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { user } = await req.json();

  // Update the token in the callback
  const newToken = {
    ...session,
    user: {
      ...session.user,
      ...user,
    },
  };

  // Update the JWT
  await authOptions.callbacks?.jwt({
    token: newToken,
    user,
    trigger: "update",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
