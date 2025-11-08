"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export type SignupRole = "Researcher" | "Provider";

export interface SignupFormProps extends React.ComponentProps<"div"> {
  role: SignupRole;
}

const baseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string().min(8, "Confirm your password"),
  phone_number: z
    .string()
    .regex(/^\+?\d{8,15}$/, "Invalid phone number format"),
  organization: z.string().min(2, "Organization is required"), // inclus pour tous
});

// Refine pour vérifier la correspondance des mots de passe
const addPasswordRefine = <T extends z.ZodTypeAny>(schema: T) =>
  schema.refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm({ role, className, ...props }: SignupFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Si role = Researcher, rendre organization optionnel
  const schema =
    role === "Provider"
      ? addPasswordRefine(baseSchema)
      : addPasswordRefine(baseSchema.partial({ organization: true })); // rend organization optionnel

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {

    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          role, // Ajouter le rôle sélectionné
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Account created!",
          description: `Welcome ${data.name} 🎉`,
          variant: "success",
          position: "top-right",
          duration: 4000,
        });
      } else {
        toast({
          title: "Error creating account",
          description: result.error,
          variant: "destructive",
          position: "top-right",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error creating account",
        description: err.message,
        variant: "destructive",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 space-y-4"
          >
            <div className="flex flex-col items-center gap-2 text-center mb-4">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm">
                Fill in your details below
              </p>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </Field>

              {role === "Provider" && (
                <Field>
                  <FieldLabel>Organization</FieldLabel>
                  <Input
                    placeholder="Orbit Energy"
                    {...register("organization")}
                  />
                  {errors.organization && (
                    <p className="text-sm text-red-500">
                      {errors.organization.message}
                    </p>
                  )}
                </Field>
              )}

              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  placeholder="+21612345678"
                  {...register("phone_number")}
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </Field>

              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...register("password")} />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input type="password" {...register("confirmPassword")} />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </Field>
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <a href="/auth/sign-in" className="underline">
                  Sign in
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
