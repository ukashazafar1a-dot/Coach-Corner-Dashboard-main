"use client";
import PlusIcon from "@/components/icons/PlusIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import { TeamMemberItem } from "@/helpers/types";
import TeamSubHeader from "./TeamSubHeader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconChat from "@/components/icons/IconChat";
import IconEdit from "@/components/icons/IconEdit";
import IconDelete from "@/components/icons/IconDelete";
import PermissionValidator from "@/components/PermissionValidator";
import TeamCards from "./TeamCards";

const ManageTeamPage = () => {
  const { selectedTeam, setToaster } = useApp();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [members, setMembers] = useState<TeamMemberItem[] | null>(null);

  const getTeamMembers = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/Members/${selectedTeam?.id}?teamId=${selectedTeam?.id}&pageNo=${page}&pageSize=${pageSize}`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setMembers(data?.items);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTeamMembers();
  }, []);

  return (
    <PermissionValidator value="Permission.Teams.Edit">
      <TopBar title="Manage Team" back={false}>
        <Link href={"/team/manage/add"} className="btn btn--tertiary">
          <PlusIcon />
          <span className="ps-1">Add New Member</span>
        </Link>
      </TopBar>
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <div className="px-3 py-5">
            <TeamSubHeader count={members?.length} />
            <Table>
              <TableCaption>A list of your recent players.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">First Name</TableHead>
                  <TableHead className="text-left">Last Name</TableHead>
                  <TableHead className="text-left">Email</TableHead>
                  <TableHead className="text-left">Team Role</TableHead>
                  <TableHead className="opacity-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members && members?.length > 0 ? (
                  members?.map((player) => {
                    return (
                      <TableRow key={player?.teamMemberId} className="bg-white">
                        <TableCell>{player?.fName}</TableCell>
                        <TableCell>{player?.lName}</TableCell>
                        <TableCell>{player?.email}</TableCell>
                        <TableCell>{player?.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/communication/chats?view=${player?.teamMemberId}`}
                            >
                              <IconChat
                                classes={"fill-primary cursor-pointer"}
                              />
                            </Link>
                            <IconEdit classes={"fill-white cursor-pointer"} />
                            <IconDelete classes={"cursor-pointer"} />
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
            <TeamCards members={members}/>
          </div>
        </>
      )}
    </PermissionValidator>
  );
};

export default ManageTeamPage;
