export type InputProps = {
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  variant?:
    | "default"
    | "outlined"
    | "placeholder"
    | "filled"
    | "underline"
    | "minimal";
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type ButtonProps = {
  variant?:
    | "default"
    | "outlined"
    | "ghost"
    | "destructive"
    | "success"
    | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  loaderOnly?: boolean;
  loading?: boolean;
  roundedFull?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type FileInputProps = {
  label?: string;
  placeholder?: string;
  variant?:
    | "default"
    | "outlined"
    | "underline"
    | "minimal"
    | "placeholder"
    | "filled";
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
