"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  // const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Stocker token et user dans Redux
        // dispatch(setCredentials({ token: data.token, user: data.user }));

        toast({
          title: "Login successful!",
          description: `Welcome back, ${data.user.name} 🎉`,
          variant: "success",
          position: "top-right",
          duration: 4000,
        });

        // Navigation selon le rôle
        switch (data.user.role) {
          case "Admin":
            router.push("/dashboard/admin");
            break;
          case "Provider":
            router.push("/dashboard/provider");
            break;
          case "Researcher":
            router.push("/dashboard/researcher");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
          position: "top-right",
          duration: 4000,
        });
      }
    } catch (err) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        position: "top-right",
        duration: 4000,
      });
      console.error(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
