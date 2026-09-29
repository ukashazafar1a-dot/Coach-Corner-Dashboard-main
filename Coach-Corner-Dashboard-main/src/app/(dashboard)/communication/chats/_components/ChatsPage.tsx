"use client";
import React, { Suspense, useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import ChatContent from "./ChatContent";
import { useWebNotification } from "@/hooks/useWebNotification";
import useApp from "@/context/useApp";
import PermissionValidator from "@/components/PermissionValidator";

const ChatsPage = () => {
  const { askForPermission, permission, error } = useWebNotification();
  const { setToaster } = useApp();

  useEffect(() => {
    if (permission === "denied") {
      setToaster(
        "error",
        "You need to allow notifications to use this feature"
      );
    }
  }, [permission]);

  useEffect(() => {
    if (error) {
      setToaster(
        "error",
        error ? error : "Something went wrong while asking for the permissions"
      );
    }
  }, [error]);
  useEffect(() => {
    askForPermission();
  }, []);

  return (
    <>
      <Suspense>
        <TopBar title="Chats" sticky={false} />
        <PermissionValidator value="Permission.Chats.View">
          <div className="px-3 pt-3 pb-14 md:pt-5 md:pb-2">
            <ChatContent />
          </div>
        </PermissionValidator>
      </Suspense>
    </>
  );
};

export default ChatsPage;
