"use client";

import PLATFORM_OPTIONS from "@/app/constants";
import { Icons } from "@/assets";
import { useCallback, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import EmptyLinks from "../links/empty-links";
import PhoneDisplay from "../links/phone-section";
import styles from "../links/your-links.module.scss";
import Button from "../ui/button";
import Input from "../ui/input";
import Select from "../ui/select";

export interface ILinksInputs {
  links: Array<{ platform: string; link: string }>;
}

export const DEFAULT_LINK_VALUE = { link: "", platform: "" };

export default function Links() {
  const [isInitNewLink, setIsInitNewLink] = useState(true);

  const form = useForm<ILinksInputs>({
    defaultValues: {
      links: [DEFAULT_LINK_VALUE],
    },
  });

  const {
    control,
    formState: { errors },
  } = form;

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const addNewLink = useCallback(
    (value: ILinksInputs["links"][0]) => {
      append(value);
    },
    [append]
  );

  const removeLink = (Idx: number) => {
    remove(Idx);
  };

  const onSubmit: SubmitHandler<ILinksInputs> = (data) => {
    console.log(data);
  };

  const profile = {
    firstName: "John",
    lastName: "Doe",
    imageUrl: "path/to/image.jpg",
  };

  const links = [
    { platform: "GitHub", link: "https://github.com/johndoe" },
    { platform: "LinkedIn", link: "https://linkedin.com/in/johndoe" },
  ];

  return (
    <div className="links">
      <div className="links__content">
        <div>
          <PhoneDisplay profile={undefined} links={[]} />
        </div>
        <div>
          <h1>Customize your links</h1>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>

          <Button
            className="button-add-new-link"
            type="button"
            variant="outline"
            size="large"
            onClick={() => {
              !isInitNewLink && setIsInitNewLink(true);
              isInitNewLink && addNewLink(DEFAULT_LINK_VALUE);
            }}
          >
            + Add new link
          </Button>

          {isInitNewLink ? (
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={styles["your-links"]}>
                  <div className={styles["your-links__content"]}>
                    <div className={styles["your-links__links"]}>
                      {fields.map((link, Idx) => {
                        const platformError = errors.links?.[Idx]?.platform;
                        const linkError = errors.links?.[Idx]?.link;

                        return (
                          <div key={link.id}>
                            <div className={styles["your-links__link-header"]}>
                              <span>
                                <Icons.Slash />
                                <span>{`Link #${Idx + 1}`}</span>
                              </span>
                              <Button
                                type="button"
                                className=""
                                size="large"
                                onClick={() => removeLink(Idx)}
                                variant="unstyled"
                              >
                                Remove
                              </Button>
                            </div>

                            <Select
                              name={`links.${Idx}.platform`}
                              label="Platform"
                              options={PLATFORM_OPTIONS as any}
                              required
                              validations={{
                                required: "This field is required",
                              }}
                              error={platformError?.message}
                            />
                            <Input
                              name={`links.${Idx}.link`}
                              label="Link"
                              type="text"
                              placeholder="e.g. https://example.com"
                              required
                              validations={{
                                pattern: {
                                  value:
                                    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/i,
                                  message: "Invalid URL",
                                },
                              }}
                              error={linkError?.message}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles["your-links__action"]}>
                      <Button
                        className={styles["your-links__action--submit"]}
                        type="submit"
                        variant="primary"
                        size="large"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          ) : (
            <EmptyLinks />
          )}
        </div>
      </div>
    </div>
  );
}
