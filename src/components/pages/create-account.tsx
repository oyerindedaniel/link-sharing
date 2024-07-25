"use client";

import { createUser } from "@/app/_actions";
import { Icons } from "@/assets";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/input";

import { ICreateAccountInputs } from "@/types/account";

export default function CreateAccount() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ICreateAccountInputs>({
    defaultValues: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ICreateAccountInputs> = (data) => {
    startTransition(() => {
      createUser(data)
        .then((res) => {
          console.log(res.message);
          form.reset();
          router.push("/login");
        })
        .catch((err) => console.error(err));
    });
  };

  return (
    <div className="create-account">
      <div className="create-account__content">
        <h1>Create Account</h1>
        <p>Let’s get you started sharing your links!</p>

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
              placeholder="At least 8 characters"
              leftIcon={
                <Icons.Password className="icon" style={{ color: "#737373" }} />
              }
              required
              validations={{
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="At least 8 characters"
              leftIcon={
                <Icons.Password className="icon" style={{ color: "#737373" }} />
              }
              required
              validations={{
                validate: (value: string) =>
                  value === form.getValues("password") ||
                  "Passwords do not match",
              }}
            />
            <Button
              className="flex-loader"
              type="submit"
              variant="primary"
              size="large"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Create new account
            </Button>
          </form>
        </FormProvider>

        <span className="create-account__password-desribe">
          Password must contain at least 8 characters
        </span>

        <div className="create-account__account-action">
          Already have an account?
          <Link
            className="create-account__account-action__login"
            href={"/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
