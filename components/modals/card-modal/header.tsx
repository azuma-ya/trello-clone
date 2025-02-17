"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import type { ElementRef } from "react";
import { useRef, useState } from "react";

import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import type { CardWithList } from "@/types";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === data.title) {
      return;
    }

    execute({
      title,
      id: data.id,
      boardId: params.boardId as string,
    });
  };

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 size-5 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="focus-visible:bg-whtie relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input"
          />
          <p className="text-sm text-muted-foreground">
            in list <span className="underline">{data.list.title}</span>
          </p>
        </form>
      </div>
    </div>
  );
};

Header.Skeleton = function HearderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mb-1 size-6 bg-neutral-200" />
      <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
      <Skeleton className="h-4 w-12 bg-neutral-200" />
    </div>
  );
};

export default Header;
