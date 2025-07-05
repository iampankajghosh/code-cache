export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?:
    | "default"
    | "outlined"
    | "placeholder"
    | "filled"
    | "underline"
    | "minimal"
    | "disabled";
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outlined"
    | "disabled"
    | "ghost"
    | "destructive"
    | "success"
    | "secondary";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  roundedFull?: boolean;
  iconOnly?: boolean;
}
