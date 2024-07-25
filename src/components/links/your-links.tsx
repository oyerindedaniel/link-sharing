import PLATFORM_OPTIONS from "@/app/constants";
import { Icons } from "@/assets";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/input";
import Select from "../ui/select";
import styles from "./your-links.module.scss";

interface Props {}

export default function YourLinks({}: Props) {
  const { control, watch } = useFormContext();

  const { fields, remove } = useFieldArray({
    control,
    name: "links",
  });

  const removeLink = (Idx: number) => {
    remove(Idx);
  };

  const platformOptionWatch = watch();

  console.log(fields);

  return (
    <div className={styles["your-links"]}>
      <div className={styles["your-links__content"]}>
        {fields.map((link, Idx) => (
          <div key={link.id}>
            <div className={styles["your-links__link-header"]}>
              <span>
                <Icons.Slash />
                <span>{`Link #${Idx}`}</span>
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
              validations={{ required: "This field is required" }}
            />
            <Input
              name={`links.${Idx}.link`}
              label="Link"
              type="text"
              placeholder="e.g. https://example.com"
              required
              validations={{
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/i,
                  message: "Invalid URL",
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
