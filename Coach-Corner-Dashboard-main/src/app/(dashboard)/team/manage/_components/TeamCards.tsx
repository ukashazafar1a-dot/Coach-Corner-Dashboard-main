import { TeamMemberItem } from "@/helpers/types";
import React from "react";
import TeamCard from "./TeamCard";
type props = {
  members: TeamMemberItem[] | null;
};
const TeamCards = ({ members }: props) => {
  if (!members || members?.length == 0) return;
  return (
    <div className="md:hidden block">
      {members?.map((member, index: number) => {
        return <TeamCard member={member} key={index} />;
      })}
    </div>
  );
};

export default TeamCards;
