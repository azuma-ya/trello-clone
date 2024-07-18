"use client";

interface FormTextareaProps extends TextareaProps {
  id: string;
  label?: string;
  errors?: Record<string, string[] | undefined>;
}

import FormErrors from "@/components/form/form-error";
import { Label } from "@/components/ui/label";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ id, label, disabled, className, errors, ...rest }, ref) => {
    const { pending } = useFormStatus();
    console.log(id);
    return (
      <div className="space-y-2 w-full">
        <div className="space-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-medium text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            id={id}
            name={id}
            ref={ref}
            className={cn(
              "resize-now focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className,
            )}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`}
            {...rest}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
