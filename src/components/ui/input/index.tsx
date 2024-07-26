"use client";

import React, { forwardRef } from "react";
import {
  Controller,
  FieldError,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import styles from "./index.module.scss";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  validations?: Record<string, any>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      leftIcon,
      rightIcon,
      required = false,
      error,
      type,
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
      getFieldState,
      formState,
    } = useFormContext();

    const isRequired = required || Object.keys(validations).length > 0;

    let errorMessage: string | undefined = error;
    if (!errorMessage && errors[name]) {
      errorMessage = (errors[name] as FieldError)?.message || "Can't be empty";
    }

    // const fieldState = getFieldState(fieldContext.name, formState);

    return (
      <div className={styles["input-field"]}>
        {label && (
          <label
            htmlFor={name}
            className={`${styles["input-field__label"]} ${
              errorMessage ? styles["input-field__label--error"] : ""
            }`}
          >
            {label}{" "}
            {isRequired && (
              <span className={styles["input-field__required"]}>*</span>
            )}
          </label>
        )}
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
                } ${errorMessage ? styles["input-field__input--error"] : ""}`}
                aria-invalid={errorMessage ? "true" : "false"}
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
        {errorMessage && (
          <span
            id={`${name}-error`}
            role="alert"
            className={styles["input-field__error"]}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
