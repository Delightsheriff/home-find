"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // Redirect to the home page after signing out
  };

  return (
    <Button
      variant="ghost"
      className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-100"
      onClick={handleSignOut}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
