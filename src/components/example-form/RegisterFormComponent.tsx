"use client";
import { useRegisterUserMutation} from "@/services/auth";
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

type registerData = {
  username: string;
  phoneNumber: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    road: string;
    linkAddress: string;
  };
  email: string;
  password: string;
  confirmPassword: string;
  profile: string;
};

export default function RegisterFormComponent() {
  const [registerRequest, { isLoading, error  }] = useRegisterUserMutation();
  // 1. delcare object using with useForm
  const { register, handleSubmit, reset } = useForm({
    // 2. set default values
    defaultValues: {
      username: "",
      phoneNumber: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        road: "",
        linkAddress: "",
      },
      email: "",
      password: "",
      confirmPassword: "",
      profile: "",
    },
  });

  // 3. create handleSubmit to track value from input form
  const onSubmit = (data: registerData) => {
    try {
      registerRequest({
        username: data?.username,
        phoneNumber: data?.phoneNumber,
        address: {
          addressLine1: data?.address?.addressLine1,
          addressLine2: data?.address?.addressLine2,
          road: data?.address?.road,
          linkAddress: data?.address?.linkAddress,
        },
        email: data?.email,
        password: data?.password,
        confirmPassword: data?.confirmPassword,
        profile: data?.profile,
      });
      console.log(error);

      if (data != null) {
        toast("You have register successfully!");
      }
    } catch (error) {
      toast.error("You need to register again!");
    }
    //  console.log("===> Form Data Email: ", data?.email);
    //  console.log("===> Form Data Password: ", data?.password);
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl border-0">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Create Account</CardTitle>

        <CardDescription>Fill in your information to register</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="lyta"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="012345678"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Address Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input
                  placeholder="Phnom Penh"
                  {...register("address.addressLine1")}
                />
              </div>

              <div className="space-y-2">
                <Label>Address Line 2</Label>
                <Input
                  placeholder="ChakAngre"
                  {...register("address.addressLine2")}
                />
              </div>

              <div className="space-y-2">
                <Label>Road</Label>
                <Input placeholder="02" {...register("address.road")} />
              </div>

              <div className="space-y-2">
                <Label>Google Maps Link</Label>
                <Input
                  placeholder="https://maps.google.com/..."
                  {...register("address.linkAddress")}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>

          {/* Profile Image */}
          <div className="space-y-2">
            <Label htmlFor="profile">Profile Image URL</Label>

            <Input
              id="profile"
              placeholder="https://..."
              {...register("profile")}
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Create Account
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Sign In
            </span>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
