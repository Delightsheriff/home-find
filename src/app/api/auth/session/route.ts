// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth"; // Adjust the import path as needed

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return new Response(JSON.stringify({ error: "Not authenticated" }), {
//       status: 401,
//     });
//   }

//   const { user } = await req.json();

//   // Update the token in the callback
//   const newToken = {
//     ...session,
//     user: {
//       ...session.user,
//       ...user,
//     },
//   };

//   // Update the JWT
//   // Check if jwt callback exists and call it with all required parameters
//   if (authOptions.callbacks?.jwt) {
//     await authOptions.callbacks.jwt({
//       token: newToken,
//       user,
//       trigger: "update",
//       account: null, // Required parameter
//       profile: undefined, // Required parameter
//       isNewUser: false, // Required parameter
//       session: undefined, // Required parameter
//     });
//   }

//   return new Response(JSON.stringify({ success: true }), {
//     status: 200,
//   });
// }

// app/api/auth/session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust the path according to your project structure

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(session), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
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

  // Check if jwt callback exists and call it with all required parameters
  if (authOptions.callbacks?.jwt) {
    await authOptions.callbacks.jwt({
      token: newToken,
      user,
      trigger: "update",
      account: null,
      profile: undefined,
      isNewUser: false,
      session: undefined,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
