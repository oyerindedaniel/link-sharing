"use client";

import { Icons } from "@/assets";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "./ui/button";
import Input from "./ui/input";

export default function CreateAccount() {
  interface ICreateAccountInputs {
    emailAddress: string;
    password: string;
    confirmPassword: string;
  }

  const form = useForm<ICreateAccountInputs>({
    defaultValues: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ICreateAccountInputs> = (data) => {
    console.log(data);
  };

  console.log(form.formState.errors);

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
            <Button type="submit" variant="primary" size="large">
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
