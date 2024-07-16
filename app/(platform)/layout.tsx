import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
