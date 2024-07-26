"use client";

import { updateUser } from "@/app/_actions";
import { User } from "@/types/users";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/input";

interface IProfileInputs extends Omit<User, "password" | "id"> {}

export default function Profile({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();

  const { id, imgSrc, emailAddress, firstName, lastName } = user ?? {};

  const form = useForm<IProfileInputs>({
    defaultValues: {
      emailAddress,
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  const onSubmit: SubmitHandler<IProfileInputs> = (data) => {
    startTransition(() => {
      updateUser(id, data)
        .then((res) => {
          console.log(res);
          form.reset();
        })
        .catch((err) => console.error(err));
    });
  };

  return (
    <div>
      <h1>Profile Details</h1>
      <p>Add your details to create a personal touch to your profile.</p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="profile-form-container">
            <div className="profile-input-container">
              <span>First name*</span>
              <Input
                name="firstName"
                type="text"
                placeholder="e.g. John"
                required
              />
            </div>
            <div className="profile-input-container">
              <span>Last name*</span>
              <Input
                name="lastName"
                type="text"
                placeholder="e.g. Appleseed"
                required
              />
            </div>
            <div className="profile-input-container">
              <span>Email</span>

              <Input
                name="emailAddress"
                type="email"
                placeholder="e.g. email@example.com"
                required
                validations={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
            </div>
          </div>
          <div className="action">
            <Button
              className="action--submit flex-loader"
              type="submit"
              variant="primary"
              size="large"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
