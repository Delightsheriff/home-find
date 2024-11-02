import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In | NestQuest",
  description:
    "Login to your account to buy, sell, or rent properties on NestQuest.",
};

export default function SignInPage() {
  return (
    <div className="container bg-deep_orange-50 mx-auto flex items-center justify-center min-h-screen px-4 ">
      <Card className="w-full max-w-md bg-white-A700 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
