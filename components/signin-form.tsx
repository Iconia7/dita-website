"use client";

import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import axios from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  admno: z.string().min(1, "Admission number is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInPayload = z.infer<typeof formSchema>;

async function signIn(payload: SignInPayload) {
  const { data } = await axios.post("/auth/signin", payload);
  return data;
}

export default function SignInForm() {
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Signed in successfully");
      router.push("/");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  const form = useForm({
    defaultValues: {
      admno: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      login(value);
    },
  });

  return (
    <div className="flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your Daystar student credentials
          </p>
        </div>

        <form
          id="signin-form"
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="admno">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Admission Number</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="20-0000"
                    aria-invalid={isInvalid}
                    className="h-10"
                  />
                  {isInvalid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name}>Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="••••••••"
                    aria-invalid={isInvalid}
                    className="h-10"
                  />
                  {isInvalid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <Button type="submit" className="w-full h-10" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <div className="space-y-4">
          <Separator />
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
