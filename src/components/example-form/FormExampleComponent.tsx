"use client";
import { useLoginUserMutation } from "@/services/auth";
import { error } from "console";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { email } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller} from "react-hook-form";
import { z } from "zod";

export const title = "Form with Optional Fields";

const formSchema = z.object({
  email:  z.string()
    .email({ pattern: z.regexes.rfc5322Email })
    .min(1, "Add at least one email address."),
  password: z.string()
  .min(8, "Add at least 8 digits")
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "At least 8 character, at least one uppercase English letter, at least one lowercase English letter, at least one digit and at least one specil character. ")
});

type formData = {
  email: string;
  password: string;
};

export default function FormExampleComponent() {
  const [loginRequest, { error }] = useLoginUserMutation();
  // 1. delcare object using with useForm
  const { register, handleSubmit, reset, setError } = useForm({
    // 2. set default values
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. create handleSubmit to track value from input form
  const onSubmit = (data: formData) => {
    try {
      loginRequest({
        email: data?.email,
        password: data?.password,
      });
      console.log(error);

      if (data != null) {
        toast("You have login successfully!");
      }
    } catch (error) {
      toast.error("You need to login again!");
    }
    //  console.log("===> Form Data Email: ", data?.email);
    //  console.log("===> Form Data Password: ", data?.password);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Log in Form</CardTitle>

          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              log in
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
