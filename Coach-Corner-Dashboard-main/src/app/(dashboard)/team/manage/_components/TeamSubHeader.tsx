import FilterIcon from "@/components/icons/FilterIcon";
import IconSearch from "@/components/icons/IconSearch";
import useApp from "@/context/useApp";
import Link from "next/link";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
type props = {
  count?: number;
};
const TeamSubHeader = ({ count = 0 }: props) => {
  const { selectedTeam } = useApp();
  return (
    <div className="table--header flex items-center justify-between flex-wrap mb-3 gap-2 md:gap-0">
      <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
        <p className="m-0 text-lg font-medium">{selectedTeam?.name}</p>
        <Link
          href={`/team/edit`}
          className="px-2 py-1 bg-primary text-white rounded flex items-center justify-start gap-1 text-sm"
        >
          <AiOutlineEdit />
          <span>Edit</span>
        </Link>
      </div>
      <div className="team-actions flex items-center gap-3 flex-wrap justify-between md:justify-end">
        <div className="team-count">
          Total Members: <b>{count}</b>
        </div>
        <div className="actions text-black bg-primary flex items-center p-1 rounded justify-center">
          <p className="inline-block px-1 mr-1 border-r border-white/50">
            <IconSearch classes={"stroke-white w-4 h-4 fill-none"} />
          </p>
          <FilterIcon classes={"stroke-white fill-white w-4 h-4 ml-1"} />
        </div>
        <Link
          href={"/team/invites"}
          className="btn text-xs btn--primary px-2 py-1"
        >
          Invites Links
        </Link>
      </div>
    </div>
  );
};

export default TeamSubHeader;
