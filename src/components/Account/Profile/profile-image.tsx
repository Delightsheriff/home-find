"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { uploadProfileImage } from "@/lib/user";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProfileImageProps {
  user: Partial<User>;
}

export default function ProfileImage({ user }: ProfileImageProps) {
  const router = useRouter();
  const { update: updateSession, data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadProfileImage(formData);

      if (!result.success) {
        throw new Error(result.error);
      }
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          ...result.data,
        },
      });
      router.refresh();

      toast({
        title: "Profile picture updated",
        description: "Your new profile picture has been set successfully.",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <AvatarImage
            src={user.profilePictureUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
        )}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Update Profile Picture"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
