"use client";

import { createLink, updateLinks } from "@/app/_actions";
import PLATFORM_OPTIONS from "@/app/constants";
import { Icons } from "@/assets";
import type { ILinksInputs, Links } from "@/types/links";
import { Loader2 } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import EmptyLinks from "../links/empty-links";
import styles from "../links/your-links.module.scss";
import Button from "../ui/button";
import Input from "../ui/input";
import Select from "../ui/select";

export const DEFAULT_LINK_VALUE = {
  link: "",
  platform: "github",
  brandColor: "",
} as ILinksInputs["links"][number];

export const DUMMY_USERID = 1;

export default function Links({
  userLinks,
  asEdit,
}: {
  userLinks: Links;
  asEdit: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const [isInitNewLink, setIsInitNewLink] = useState(asEdit);

  const form = useForm<ILinksInputs>({
    defaultValues: {
      links: asEdit ? userLinks : [DEFAULT_LINK_VALUE],
    },
  });

  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = form;

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
    if (asEdit) {
      return startTransition(() => {
        updateLinks(data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.error(err));
      });
    }

    startTransition(() => {
      createLink({ ...data, userId: DUMMY_USERID })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error(err));
    });
  };

  const handlePlatformChange = (platform: string, index: number) => {
    const platformOption = PLATFORM_OPTIONS.find(
      (option) => option.value === platform
    );
    const brandColor = platformOption ? platformOption.color : "#fff";

    setValue(`links.${index}.brandColor`, brandColor);
  };

  console.log(errors);

  return (
    <div>
      <h1>Customize your links</h1>
      <p>
        Add/edit/remove links below and then share all your profiles with the
        world!
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
                    const linkError =
                      errors.links?.[Idx]?.link?.message ||
                      errors.links?.[Idx]?.link?.type;

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
                          onChangeValue={(option) =>
                            handlePlatformChange(option, Idx)
                          }
                        />
                        <Input
                          name={`links.${Idx}.link`}
                          label="Link"
                          type="text"
                          placeholder="e.g. https://example.com"
                          required
                          leftIcon={
                            <Icons.Link
                              className="icon"
                              style={{ color: "#737373" }}
                            />
                          }
                          validations={{
                            pattern: {
                              value:
                                /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/i,
                              message: "Invalid URL",
                            },
                          }}
                          error={linkError}
                        />
                        <input
                          type="hidden"
                          {...register(`links.${Idx}.brandColor` as const)}
                        />
                      </div>
                    );
                  })}
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
              </div>
            </div>
          </form>
        </FormProvider>
      ) : (
        <EmptyLinks />
      )}
    </div>
  );
}
