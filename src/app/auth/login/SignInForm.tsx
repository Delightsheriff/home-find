"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SignInData, SignInSchema } from "@/lib/definitions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData & { rememberMe: boolean }>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<SignInData & { rememberMe: boolean }> = async (
    data,
  ) => {
    const callbackUrl = searchParams.get("callbackUrl") || "/"; //TODO:fix
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value.toString()),
      );
      // Call the signIn function without passing dispatch
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      // const result = await signIn(formData, validCallbackUrl);
      if (result?.ok) {
        toast({
          title: "Success",
          description: "Sign in successful",
          variant: "success",
        });
        // Redirect to callbackUrl if available, or default
        router.push(callbackUrl);
      } else {
        throw new Error("Sign in failed");
      }
    } catch (error) {
      console.error(error);
      // Handle sign-in failure on the client side

      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const InputField: React.FC<{
    id: keyof SignInData;
    label: string;
    type?: string;
    placeholder?: string;
  }> = ({ id, label, type = "text", placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            id={id}
            type={type === "password" && isVisible ? "text" : type}
            placeholder={placeholder}
            {...register(id)}
            className={type === "password" ? "pr-10" : ""}
          />
          {type === "password" && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
            >
              {isVisible ? (
                <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>
        {errors[id] && (
          <p className="text-sm text-red-500">{errors[id]?.message}</p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="john.doe@example.com"
      />
      <InputField id="password" label="Password" type="password" />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <Label htmlFor="rememberMe">Remember me</Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging In..." : "Login"}
      </Button>
    </form>
  );
}
