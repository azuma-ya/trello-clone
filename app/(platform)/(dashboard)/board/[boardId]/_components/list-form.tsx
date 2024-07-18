import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { createList } from "@/actions/create-list";
import FormInput from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

import ListWarpper from "./list-wrapper";

const ListForm = () => {
  const params = useParams();
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" is created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const onkeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onkeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWarpper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-5" />
            </Button>
          </div>
        </form>
      </ListWarpper>
    );
  }

  return (
    <ListWarpper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="size-4 mr-2" />
        Add a list
      </button>
    </ListWarpper>
  );
};

export default ListForm;
