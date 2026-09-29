"use client";
import useApp from "@/context/useApp";
import React from "react";
import NoPermissionCard from "./NoPermissionCard";
import { Coachclaim } from "@/helpers/types";
import { hasClaim } from "@/lib/utils";
import SectionLoader from "./loaders/SectionLoader";

type props = {
  children: React.ReactNode;
  value: Coachclaim;
};

const PermissionValidator = ({ children, value }: props) => {
  const { organization } = useApp();
  // Show loader while organization is loading
  if (!organization) {
    return <SectionLoader />;
  }
  //console.log('org in validator',organization)
  const isAuthorized = hasClaim(organization?.claims, value);
  //console.log('isauthorized in validator',isAuthorized)
  return isAuthorized ? <>{children}</> : <NoPermissionCard />;
};

export default PermissionValidator;
