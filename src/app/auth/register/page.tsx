import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up | NestQuest",
  description:
    "Create an account to buy, sell, or rent properties on NestQuest.",
};

export default function Page() {
  return (
    <div className="container bg-deep_orange-50 mx-auto flex items-center justify-center min-h-screen px-4 ">
      <Card className="w-full max-w-md mx-auto bg-white-A700">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to buy, sell, or rent properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
