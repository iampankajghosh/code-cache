"use client";

import React, { useId } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type FileInputProps = {
  label?: string;
  variant?:
    | "default"
    | "outlined"
    | "underline"
    | "minimal"
    | "placeholder"
    | "filled";
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const fileInputVariants = cva(
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

function FileInput({
  label,
  variant = "default",
  inputSize = "md",
  fullWidth,
  className = "",
  errorMessage = "",
  disabled = false,
  ...props
}: Readonly<FileInputProps>) {
  const id = useId();
  const inputId = `file-input-${id}`;
  const errorId = `error-${id}`;
  const hasError = Boolean(errorMessage);
  const sizeTextClass = sizeTextMap[inputSize];

  const wrapperClasses = twMerge(
    fileInputVariants({
      variant,
      inputSize,
      hasError,
    }),
    fullWidth && "w-full"
  );

  return (
    <div
      className={twMerge(
        "flex flex-col gap-1",
        fullWidth ? "w-full" : "sm:w-auto",
        disabled && "pointer-events-none opacity-50",
        className
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
        <input
          id={inputId}
          type="file"
          disabled={disabled}
          aria-describedby={hasError ? errorId : undefined}
          className={twMerge(
            "flex-1 px-2 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-primary/90 file:font-medium file:text-white cursor-pointer bg-transparent file:cursor-pointer file:transition file:duration-300 file:ease-in-out",
            fullWidth && "w-full"
          )}
          {...props}
        />
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

export default React.memo(FileInput);
