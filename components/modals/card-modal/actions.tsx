"use client";

import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import type { CardWithList } from "@/types";

interface ActionsProps {
  data: CardWithList;
}

const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const onClose = useCardModal((state) => state.onClose);

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onDelete = () => {
    executeDelete({ id: data.id, boardId: params.boardId as string });
  };

  const onCopy = () => {
    executeCopy({ id: data.id, boardId: params.boardId as string });
  };

  return (
    <div className="mb-2 space-y-2">
      <p className="">Actions</p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="mr-2 size-4" />
        Copy
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="mr-2 size-4" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};

export default Actions;
