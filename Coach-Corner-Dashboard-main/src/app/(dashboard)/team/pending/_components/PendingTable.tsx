import FilterIcon from "@/components/icons/FilterIcon";
import IconSearch from "@/components/icons/IconSearch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useApp from "@/context/useApp";
import { PendingInviteItem } from "@/helpers/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ApproveInvite from "./ApproveInvite";
import ViewApproval from "./ViewApprovel";
import DeclineApproval from "./DeclineApproval";

type props = {
  requests: PendingInviteItem[];
  handleRefetch: () => void;
};
const PendingTable = ({ requests, handleRefetch }: props) => {
  const { selectedTeam } = useApp();
  return (
    <div className="px-3 py-5">
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
        <div className="team-actions flex items-center justify-between md:justify-end gap-3 flex-wrap w-full md:w-auto">
          <div className="team-count">
            Total Members: <b>{requests?.length}</b>
          </div>
          <div className="actions text-black bg-primary flex items-center p-1 rounded justify-center">
            <p className="inline-block px-1 mr-1 border-r border-white/50">
              <IconSearch classes={"stroke-white w-4 h-4 fill-none"} />
            </p>
            <FilterIcon classes={"stroke-white fill-white w-4 h-4 ml-1"} />
          </div>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your recent players.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Team Role</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Created at</TableHead>
            <TableHead className="opacity-0">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests && requests?.length > 0 ? (
            requests?.map((player) => {
              return (
                <TableRow key={player?.id} className="bg-white">
                  <TableCell>
                    {player?.user?.fName} {player?.user?.lName}
                  </TableCell>
                  <TableCell>{player?.user?.email}</TableCell>
                  <TableCell>{player?.user?.role}</TableCell>
                  <TableCell>{player?.status}</TableCell>
                  <TableCell>{formatDate(player?.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <ViewApproval id={player?.id} />
                      <ApproveInvite
                        invite={player}
                        handleRefetch={handleRefetch}
                      />
                      <div>
                        <DeclineApproval
                          handleRefetch={handleRefetch}
                          id={player?.id}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No players found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingTable;
