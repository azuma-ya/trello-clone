"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useOrganizationList } from "@clerk/nextjs";

const OrgContorol = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);

  return null;
};

export default OrgContorol;
