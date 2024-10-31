import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center">
            Welcome to NestQuest
            {session && <span> (Logged in)</span>}
            <p>{session?.user?.firstName}</p>
          </h1>
        </div>
      </section>
    </main>
  );
}
