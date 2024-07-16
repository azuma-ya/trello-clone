"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/user-mobile-side";

import Sidebar from "./sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const mobileSidebar = useMobileSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    mobileSidebar.onClose();
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={mobileSidebar.onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="size-4 " />
      </Button>
      <Sheet open={mobileSidebar.isOpen} onOpenChange={mobileSidebar.onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
