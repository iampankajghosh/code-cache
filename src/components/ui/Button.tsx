"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { Loader } from "../loaders";
import type { ButtonProps } from "./types";

// Tailwind variant styles for the button
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-medium overflow-hidden cursor-pointer min-h-[44px] min-w-[44px] transition duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outlined: "bg-transparent text-primary border border-primary",
        ghost: "bg-transparent text-primary hover:bg-primary/5",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        success: "bg-green-600 text-white hover:bg-green-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      },
      size: {
        sm: "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm",
        md: "px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base",
        lg: "px-4 py-2 text-base sm:px-5 sm:py-3 sm:text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      roundedFull: {
        true: "rounded-full",
        false: "rounded-md",
      },
      iconOnly: {
        true: "p-2",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-[44px] h-[44px]" },
      { iconOnly: true, size: "md", class: "w-[48px] h-[48px]" },
      { iconOnly: true, size: "lg", class: "w-[52px] h-[52px]" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
      roundedFull: false,
      iconOnly: false,
    },
  }
);

// Button component
function Button({
  children,
  className = "",
  variant,
  size,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth,
  roundedFull,
  iconOnly,
  loaderOnly,
  ...props
}: Readonly<ButtonProps>) {
  const isDisabled = disabled || loading;

  const buttonClasses = twMerge(
    buttonVariants({ variant, size, fullWidth, roundedFull, iconOnly }),
    isDisabled && "pointer-events-none opacity-50",
    className
  );

  const renderIcon = (icon: React.ReactNode) => icon && <span>{icon}</span>;

  return (
    <button className={buttonClasses} disabled={isDisabled} {...props}>
      {loading && loaderOnly ? (
        <Loader />
      ) : (
        <>
          {renderIcon(leftIcon)}
          {!iconOnly && children}
          {renderIcon(rightIcon)}
          {loading && <Loader />}
        </>
      )}
    </button>
  );
}

export default React.memo(Button);
