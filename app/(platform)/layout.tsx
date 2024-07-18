import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

import ModalProvider from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
