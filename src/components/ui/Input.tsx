"use client";

import React, { memo, useCallback, useId, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { InputProps } from "./types";

const inputVariants = cva(
  "relative inline-flex items-center rounded-md overflow-hidden transition duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-gray-100 ring-1 ring-gray-300",
        outlined: "bg-transparent ring-2 ring-primary",
        placeholder: "bg-transparent ring-1 ring-gray-300",
        filled: "bg-gray-200 ring-0",
        underline:
          "bg-transparent border-b-2 border-primary rounded-none focus:ring-0",
        minimal: "bg-transparent ring-0",
      },
      inputSize: {
        sm: "h-7 min-w-[140px] text-xs sm:h-8 sm:min-w-[160px]",
        md: "h-9 min-w-[160px] text-sm sm:h-10 sm:min-w-[180px]",
        lg: "h-10 min-w-[180px] text-base sm:h-12 sm:min-w-[200px]",
      },
      hasError: {
        true: "ring-2 ring-red-500 focus-within:ring-red-500 border-red-500",
        false: "focus-within:ring-2 focus-within:ring-primary",
      },
    },
    compoundVariants: [
      { variant: "underline", hasError: true, class: "focus-within:ring-0" },
      { variant: "underline", hasError: false, class: "focus-within:ring-0" },
    ],
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      hasError: false,
    },
  }
);

const sizeTextMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const iconWrapperClass =
  "w-8 sm:w-9 h-full inline-flex items-center justify-center";

function Input({
  type = "text",
  label,
  leftIcon,
  rightIcon,
  variant = "default",
  inputSize = "md",
  fullWidth,
  className = "",
  errorMessage = "",
  disabled = false,
  ...props
}: Readonly<InputProps>) {
  const id = useId();
  const inputId = `input-${id}`;
  const errorId = `error-${id}`;

  const hasError = Boolean(errorMessage);
  const isPassword = type === "password";
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputType = isPassword ? (passwordVisible ? "text" : "password") : type;
  const sizeTextClass = sizeTextMap[inputSize];

  const handleTogglePassword = useCallback(
    () => setPasswordVisible((prev) => !prev),
    []
  );

  const renderIcon = (icon: React.ReactNode) =>
    icon && <span className={iconWrapperClass}>{icon}</span>;

  const wrapperClasses = twMerge(
    inputVariants({
      variant,
      inputSize,
      hasError,
    }),
    fullWidth && "w-full",
    disabled && "pointer-events-none opacity-50",
    className
  );

  const inputClasses = twMerge(
    "border-none outline-none bg-transparent flex-1 py-1",
    sizeTextClass,
    variant === "placeholder" && "placeholder:text-primary",
    !leftIcon && "pl-3",
    !rightIcon && !isPassword && "pr-3",
    variant === "underline" && "rounded-none"
  );

  return (
    <div
      className={twMerge(
        "flex flex-col gap-1",
        fullWidth ? "w-full" : "sm:w-auto",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge("font-medium", sizeTextClass)}
        >
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {renderIcon(leftIcon)}

        <input
          id={inputId}
          type={inputType}
          disabled={disabled}
          aria-describedby={hasError ? errorId : undefined}
          className={inputClasses}
          {...props}
        />

        {renderIcon(rightIcon)}

        {isPassword && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className={twMerge(iconWrapperClass, "cursor-pointer")}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? <LuEyeOff size={20} /> : <LuEye size={20} />}
          </button>
        )}
      </div>

      {hasError && (
        <p
          id={errorId}
          className={twMerge("mt-0.5 text-red-500", sizeTextClass)}
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default memo(Input);
