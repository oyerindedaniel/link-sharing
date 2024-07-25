"use client";

import { loginUser } from "@/app/_actions";
import { Icons } from "@/assets";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/input";

export interface ILoginInputs {
  emailAddress: string;
  password: string;
}

export default function Login() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<ILoginInputs>({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    startTransition(() => {
      loginUser(data)
        .then((res) => {
          console.log(res);
          router.push("/links");
        })
        .catch((err) => console.error(err));
    });
  };

  return (
    <div className="login">
      <div className="login__content">
        <h1>Login</h1>
        <p>Add your details below to get back into the app</p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Input
              name="emailAddress"
              label="Email address"
              type="email"
              placeholder="e.g. alex@email.com"
              required
              leftIcon={
                <Icons.Envelope className="icon" style={{ color: "#737373" }} />
              }
              validations={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={
                <Icons.Password className="icon" style={{ color: "#737373" }} />
              }
              required
            />
            <Button
              className="flex-loader"
              type="submit"
              variant="primary"
              size="large"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Login
            </Button>
          </form>
        </FormProvider>

        <div className="login__account-action">
          Don’t have an account?{" "}
          <Link
            className="login__account-action__create"
            href={"/create-account"}
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
