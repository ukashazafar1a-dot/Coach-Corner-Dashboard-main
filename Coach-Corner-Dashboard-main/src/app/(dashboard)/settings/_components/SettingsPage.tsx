"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopBar from "@/components/TopBar";
import { LuUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlinePolicy } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";
import NotificationTab from "./NotificationTab";
import SecurityTab from "./SecurityTab";
import { MdOutlineAddHomeWork } from "react-icons/md";
import InvitesTab from "./InvitesTab";
import UserBlock from "./UserBlock";
import { RiGroupLine } from "react-icons/ri";
import ParentTab from "./ParentTab";
import { useQueryParams } from "@/hooks/useQueryParams";

type tabType =
  | "profile"
  | "parent"
  | "password"
  | "notifications"
  | "policies"
  | "security"
  | "invites";

const tabText: tabType[] = [
  "profile",
  "parent",
  "password",
  "notifications",
  "policies",
  "security",
  "invites",
];

const SettingsPage = () => {
  const [tabs, setTabs] = useState<tabType>("profile");
  const { queryParam, setQueryParam } = useQueryParams();

  const handleTabChange = (value: string) => {
    setTabs(value as tabType);
    setQueryParam("page", value);
  };

  useEffect(() => {
    if (queryParam && queryParam.get("page")) {
      if (tabText.includes(queryParam.get("page") as tabType)) {
        setTabs(queryParam.get("page") as tabType);
      }
    } else {
      setQueryParam("page", tabs);
    }
  }, []);

  return (
    <div>
      <TopBar title="Settings" />
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <UserBlock />
        <Tabs
          value={tabs}
          onValueChange={handleTabChange}
          className="w-full flex justify-start flex-col md:flex-row"
          orientation="vertical"
        >
          <div className="basis-full md:basis-1/5 h-full md:sticky md:top-16">
            <TabsList className="bg-transparent md:flex-col h-full gap-2 w-full overflow-x-auto justify-start px-0 py-1.5">
              <TabsTrigger
                value="profile"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <LuUser className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="parent"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <RiGroupLine className="w-4 h-4" />
                Parent Information
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <RiLockPasswordLine className="w-4 h-4" />
                Password
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <IoMdNotificationsOutline className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="invites"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <MdOutlineAddHomeWork className="w-4 h-4" />
                Invites
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <MdOutlinePolicy className="w-4 h-4" />
                Policies
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="gap-1 w-full justify-start text-base data-[state=active]:bg-primary  data-[state=active]:text-white"
              >
                <MdOutlineManageAccounts className="w-4 h-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="px-0 py-3 md:px-3 basis-full">
            <TabsContent value="profile" className="basis-full">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="parent" className="basis-full">
              <ParentTab />
            </TabsContent>
            <TabsContent value="password" className="basis-full">
              <PasswordTab />
            </TabsContent>
            <TabsContent value="notifications" className="basis-full">
              <NotificationTab />
            </TabsContent>
            <TabsContent value="policies" className="basis-full">
              Change your password here.
            </TabsContent>
            <TabsContent value="security" className="basis-full">
              <SecurityTab />
            </TabsContent>
            <TabsContent value="invites" className="basis-full">
              <InvitesTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
