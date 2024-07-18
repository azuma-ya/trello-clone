"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ElementRef } from "react";
import { useRef, type ReactNode } from "react";
import { toast } from "sonner";

import { createBoard } from "@/actions/create-board";
import FormInput from "@/components/form/form-input";
import FormPicker from "@/components/form/form-picker";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopover {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side,
  align,
  sideOffset = 0,
}: FormPopover) => {
  const router = useRouter();
  const buttonRef = useRef<ElementRef<"button">>(null);
  const onOpen = useProModal((state) => state.onOpen);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      buttonRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error);
      onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create board
        </div>
        <PopoverClose ref={buttonRef} asChild>
          <Button
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
