"use client";

import Image from "next/image";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

const ProModal = () => {
  const isOpen = useProModal((state) => state.isOpen);
  const onClose = useProModal((state) => state.onClose);

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative m-4 flex aspect-video items-center justify-center">
          <Image src="/next.svg" alt="Hero" className="object-contain" fill />
        </div>
        <div
          className="mx-auto space-y-6 p-6 text-neutral-700
         "
        >
          <h2 className="text-xl font-semibold">Update to Azello Pro Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Azello
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant="primary"
            onClick={onClick}
            disabled={isLoading}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
