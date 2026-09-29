import TopBar from "@/components/TopBar";
import React from "react";
import InviteViaEmail from "./InviteViaEmail";

const GroupInvitePage = () => {
  return (
    <div>
      <TopBar title={"Invite New Members"} />
      <div className="px-4 py-8">
        <InviteViaEmail />
      </div>
    </div>
  );
};

export default GroupInvitePage;
