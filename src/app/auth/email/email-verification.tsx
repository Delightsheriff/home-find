"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResendVerificationEmailState } from "@/lib/definitions";
import { resendVerificationEmail } from "./actions";
import { useRouter } from "next/navigation";

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      className="bg-black-A700_01 text-white-A700 group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Resending...
        </>
      ) : (
        <>
          <Mail className="mr-2 h-4 w-4" />
          Resend verification email
        </>
      )}
    </Button>
  );
}

export default function EmailVerification() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [state, setState] = React.useState<ResendVerificationEmailState>({
    success: false,
    message: "",
  });

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        // Pass the current state and formData
        const result = await resendVerificationEmail(state, formData);
        setState(result);

        if (result.success) {
          toast({
            title: "Verification email sent",
            description: result.message,
            duration: 5000,
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description: result.message,
            duration: 5000,
            variant: "destructive",
          });
          router.push("/auth/login");
        }
        /* eslint-disable */
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send verification email",
          duration: 5000,
          variant: "destructive",
        });
        router.push("/auth/login");
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white-A700 p-6 shadow-lg">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;ve sent a verification link to your email address. Please
            check your inbox and click on the link to verify your account.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <form
            action={async (formData) => {
              await handleSubmit(formData);
            }}
          >
            <input type="hidden" name="email" value={email} />
            <SubmitButton isPending={isPending} />
          </form>
          <div className="flex items-center justify-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <p className="text-sm text-gray-600">
              Didn&apos;t receive an email? Check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
