"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import React, { type ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.scss";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "unstyled"
  | "outline";
type ButtonSize = "small" | "medium" | "large" | "fit";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "unstyled",
      size = "small",
      leftElement,
      rightElement,
      children,
      className,
      asChild = false,
      ...rest
    },
    ref
  ) => {
    const buttonClasses = [
      ...[asChild ? styles.slot : styles.button],
      styles[`button--${variant}`],
      styles[`button--${size}`],
      className,
    ].join(" ");

    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={buttonClasses} ref={ref} {...rest}>
        {leftElement && leftElement}
        <Slottable>{children}</Slottable>
        {rightElement && rightElement}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
