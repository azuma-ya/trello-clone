"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";

interface FormSubmitProps extends ButtonProps {}

const FormSubmit = ({
  children,
  disabled,
  variant = "primary",
  ...rest
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
