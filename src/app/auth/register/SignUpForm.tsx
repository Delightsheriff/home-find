"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CheckCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignupFormData, SignupFormSchema } from "@/lib/definitions";
import { toast } from "@/hooks/use-toast";
import { signUp } from "./actions";

const InputField: React.FC<{
  id: keyof SignupFormData;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<SignupFormData>;
  error?: string;
}> = ({ id, label, type = "text", placeholder, register, error }) => {
  const [isVisible, setIsVisible] = useState(false);

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
            onClick={() => setIsVisible(!isVisible)}
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      role: "tenant",
    },
  });

  const selectedRole = watch("role");

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value),
      );

      const result = await signUp(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "success",
        });
        router.push(result.redirectUrl || "/");
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (error) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="firstName"
          label="First Name"
          placeholder="John"
          register={register}
          error={errors.firstName?.message}
        />
        <InputField
          id="lastName"
          label="Last Name"
          placeholder="Doe"
          register={register}
          error={errors.lastName?.message}
        />
      </div>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="john.doe@example.com"
        register={register}
        error={errors.email?.message}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password?.message}
      />
      <div className="space-y-2">
        <Label>Role</Label>
        <RadioGroup
          value={selectedRole}
          onValueChange={(value: "tenant" | "landlord") =>
            setValue("role", value)
          }
          className="flex space-x-4"
        >
          {["tenant", "landlord"].map((role) => (
            <div key={role} className="flex-1">
              <RadioGroupItem value={role} id={role} className="peer sr-only" />
              <Label
                htmlFor={role}
                className={`flex items-center justify-center rounded-md border-2 p-4 hover:bg-accent hover:text-accent-foreground ${
                  selectedRole === role
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted bg-popover"
                }`}
              >
                <CheckCircle
                  className={`mr-2 h-4 w-4 ${
                    selectedRole === role ? "opacity-100" : "opacity-0"
                  }`}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
