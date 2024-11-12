"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LoginMessage = () => {
  const pathname = usePathname();

  // Encode the current pathname as the callback URL
  const currentUrl = encodeURIComponent(pathname);

  return (
    <div className="p-4 flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Login Required</h3>
        <p className="mb-4">Please log in to make a reservation.</p>

        {/* Add the callbackUrl as a query parameter to the login link */}
        <Link href={`/auth/login?callbackUrl=${currentUrl}`}>Log In</Link>
      </div>
    </div>
  );
};

export default LoginMessage;
