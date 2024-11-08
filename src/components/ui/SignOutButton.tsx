"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const SignOutButton = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({
        callbackUrl: "/auth/login",
        redirect: true,
      });
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-100"
      onClick={handleSignOut}
      disabled={isSigningOut}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      {isSigningOut ? "Signing out..." : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;
