import { startCase } from "lodash";
import { type ReactNode } from "react";

import { auth } from "@clerk/nextjs/server";
import OrgContorol from "./_components/org-contorol";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <OrgContorol />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
