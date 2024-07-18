"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";

import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
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
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="size-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-whtie focus-visible:border-input mb-0.5 truncate"
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
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="size-6 mb-1 bg-neutral-200" />
      <Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
      <Skeleton className="h-4 w-12 bg-neutral-200" />
    </div>
  );
};

export default Header;
