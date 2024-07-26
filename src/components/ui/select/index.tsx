"use client";

import React, { forwardRef } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import styles from "./index.module.scss";

interface BaseSelectOption {
  value: string | number;
  label: string;
}

interface SelectProps<T extends BaseSelectOption>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: T[];
  required?: boolean;
  validations?: Record<string, any>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  onChangeValue?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps<BaseSelectOption>>(
  (
    {
      name,
      label,
      options,
      leftIcon,
      rightIcon,
      required = false,
      validations = {},
      onChangeValue,
      error,
      ...selectProps
    },
    ref
  ) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const isRequired = required || Object.keys(validations).length > 0;

    let errorMessage: string | undefined = error;
    if (!errorMessage && errors[name]) {
      errorMessage = (errors[name] as FieldError)?.message || "Can't be empty";
    }

    return (
      <div className={styles["select-field"]}>
        <label
          htmlFor={name}
          className={`${styles["select-field__label"]} ${
            errorMessage ? styles["select-field__label--error"] : ""
          }`}
        >
          {label}{" "}
          {isRequired && (
            <span className={styles["select-field__required"]}>*</span>
          )}
        </label>
        <Controller
          name={name}
          control={control}
          rules={{ required: isRequired, ...validations }}
          render={({ field }) => (
            <div className={styles["select-field__container"]}>
              {leftIcon && (
                <span className={styles["select-field__left-icon"]}>
                  {leftIcon}
                </span>
              )}
              <select
                {...field}
                {...selectProps}
                id={name}
                ref={ref}
                className={`${styles["select-field__select"]} ${
                  leftIcon ? styles["select-field__select--with-left-icon"] : ""
                } ${
                  rightIcon
                    ? styles["select-field__select--with-right-icon"]
                    : ""
                } ${errorMessage ? styles["select-field__select--error"] : ""}`}
                aria-invalid={!!errorMessage}
                aria-describedby={`${name}-error`}
                onChange={(e) => {
                  field.onChange(e);
                  onChangeValue?.(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {rightIcon && (
                <span className={styles["select-field__right-icon"]}>
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
            className={styles["select-field__error"]}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
