"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/user";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types";

interface ProfileDetailsProps {
  user: Partial<User>;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const result = await updateProfile(formData);

      if (!result.success) {
        throw new Error(result.error);
      }
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="uppercase"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="uppercase"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={user.email} disabled />
      </div>
      <Button onClick={handleUpdate} disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
}
