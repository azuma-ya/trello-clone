"use client";

import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ onAddCard, data }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          list options
        </div>
        <PopoverClose asChild>
          <Button
            className="size-auto p-2 absolute top-2 right-2 text-neutral-600 "
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action="">
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
