import { Plus } from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import FormPopover from "@/components/form/form-popover";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={30}>
          <Button
            variant="primary"
            size="sm"
            className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
          >
            Create
          </Button>
        </FormPopover>
        <Button
          variant="primary"
          size="sm"
          className="block rounded-sm md:hidden"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2 ">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
