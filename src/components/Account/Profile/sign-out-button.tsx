"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import { signOut } from "@/lib/auth";
import { logout } from "@/lib/authSlice";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);

      const result = await signOut();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Clear Redux state
      dispatch(logout());

      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });

      // Redirect to home page
      router.push("/");
    } catch (error) {
      toast({
        title: "Error signing out",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <div>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </div>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
}
