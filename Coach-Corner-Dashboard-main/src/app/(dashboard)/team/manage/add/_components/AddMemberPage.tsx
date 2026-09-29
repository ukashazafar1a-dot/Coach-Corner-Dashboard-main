import React from "react";
import TopBar from "@/components/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InviteViaEmail from "./InviteViaEmail";
import InviteViaLink from "./InviteViaLink";

const AddMemberPage = () => {
  return (
    <>
      <TopBar title="Invite New Member" />
      <div className="px-4 py-6">
        <Tabs defaultValue="email">
          <TabsList className="bg-transparent gap-3">
            <TabsTrigger
              value="email"
              className="px-0 font-semibold !shadow-none !bg-transparent data-[state=active]:!border-b-2 border-primary !rounded-none"
            >
              Invite via Email
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="px-0 font-semibold !shadow-none !bg-transparent data-[state=active]:!border-b-2 border-primary !rounded-none"
            >
              Invite via Link
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <InviteViaEmail />
          </TabsContent>
          <TabsContent value="link">
            <InviteViaLink />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AddMemberPage;
