"use client";

import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./index.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
  validations?: Record<string, any>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      leftIcon,
      rightIcon,
      required = false,
      validations = {},
      ...inputProps
    },
    ref
  ) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const {
      control,
      formState: { errors },
    } = useFormContext();

    const isRequired = required || Object.keys(validations).length > 0;

    return (
      <div className={styles["input-field"]}>
        <label
          htmlFor={name}
          className={`${styles["input-field__label"]} ${
            errors[name] ? styles["input-field__label--error"] : ""
          }`}
        >
          {label}{" "}
          {isRequired && (
            <span className={styles["input-field__required"]}>*</span>
          )}
        </label>
        <Controller
          name={name}
          control={control}
          rules={{ required: isRequired, ...validations }}
          render={({ field }) => (
            <div className={styles["input-field__container"]}>
              {leftIcon && (
                <span className={styles["input-field__left-icon"]}>
                  {leftIcon}
                </span>
              )}
              <input
                {...field}
                {...inputProps}
                id={name}
                ref={ref}
                className={`${styles["input-field__input"]} ${
                  leftIcon ? styles["input-field__input--with-left-icon"] : ""
                } ${
                  rightIcon ? styles["input-field__input--with-right-icon"] : ""
                } ${errors[name] ? styles["input-field__input--error"] : ""}`}
                aria-invalid={errors[name] ? "true" : "false"}
                aria-describedby={`${name}-error`}
              />
              {rightIcon && (
                <span className={styles["input-field__right-icon"]}>
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        />
        {errors[name]?.message && (
          <span
            id={`${name}-error`}
            role="alert"
            className={styles["input-field__error"]}
          >
            {(errors[name]?.message as string) || ""}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
