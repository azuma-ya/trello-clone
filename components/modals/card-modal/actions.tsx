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
import { CardWithList } from "@/types";

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
    <div className="space-y-2 mb-2">
      <p className="">Actions</p>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="size-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="size-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

export default Actions;
