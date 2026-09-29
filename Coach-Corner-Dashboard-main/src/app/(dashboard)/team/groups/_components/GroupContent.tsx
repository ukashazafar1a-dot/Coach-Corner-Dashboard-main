"use client";
import { Group } from "@/helpers/types";
import React, { useEffect, useState } from "react";
import MemberRow from "./MemberRow";
import GroupCard from "@/components/GroupCard";
import Link from "next/link";
import IconChat from "@/components/icons/IconChat";
import IconSearch from "@/components/icons/IconSearch";
import PlusIcon from "@/components/icons/PlusIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import { AiOutlineEdit } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryParams } from "@/hooks/useQueryParams";
import DeleteMember from "./DeleteMember";
import useApp from "@/context/useApp";
import { hasClaim } from "@/lib/utils";

type props = {
  groups: Group[];
};
const GroupContent = ({ groups }: props) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [open, setOpen] = useState(false);
  const { setQueryParam, queryParam } = useQueryParams();
  const { organization } = useApp();

  const handleChangeGroup = (value: any) => {
    setSelectedGroup(value);
    setQueryParam("groupId", value?.id);
  };
  useEffect(() => {
    if (queryParam) {
      const id = queryParam?.get("groupId");
      if (id) {
        const group = groups?.find((group) => group?.id === id);
        if (group) {
          setSelectedGroup(group);
        } else {
          setSelectedGroup(groups[0]);
        }
      } else {
        setSelectedGroup(groups[0]);
      }
    } else {
      setSelectedGroup(groups[0]);
    }
  }, []);

  return (
    <>
      <div className="px-3 py-5">
        <div className="flex justify-start gap-2 pb-10 overflow-x-auto mb-8 ">
          {groups?.map((group) => {
            return (
              <GroupCard
                key={group?.id}
                group={group}
                changeGroup={handleChangeGroup}
                active={selectedGroup?.id === group?.id}
              />
            );
          })}
        </div>
        <div className="top-bar-wrapper">
          <div className="table--header flex items-center justify-between flex-wrap mb-3 gap-2 md:gap-0">
            <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
              <p className="m-0 text-lg font-medium">{selectedGroup?.name}</p>
              {hasClaim(organization?.claims, "Permission.Groups.Edit") && (
                <Link
                  href={`/team/groups/${selectedGroup?.id}`}
                  className="px-2 py-1 bg-primary text-white rounded flex items-center justify-start gap-1 text-sm"
                >
                  <AiOutlineEdit />
                  <span>Edit</span>
                </Link>
              )}
            </div>
            <div className="team-actions flex items-center gap-3 flex-wrap">
              <Link href={`/communication/chats?groupId=${selectedGroup?.id}`}>
                <IconChat classes="fill-themePrimary h-6 w-6 cursor-pointer" />
              </Link>
              {hasClaim(organization?.claims, "Permission.Groups.Edit") && (
                <Link
                  href={`/team/groups/${selectedGroup?.id}/invite`}
                  className="btn btn--primary py-1"
                >
                  <PlusIcon classes="fill-white h-1 w-1 " />
                  <span className="ps-1 text-sm">Add New Member</span>
                </Link>
              )}

              <div className="actions text-black bg-primary flex items-center p-1 rounded justify-center">
                <button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="px-1 mr-1 border-r border-white/50"
                >
                  <IconSearch
                    classes={"stroke-white w-5 h-5 fill-none  cursor-pointer"}
                  />
                </button>
                <FilterIcon
                  classes={
                    "stroke-white fill-white w-5 h-5 ml-1 cursor-pointer"
                  }
                />
              </div>
            </div>
          </div>
          <div
            className={`py-2 flex flex-wrap gap-4 w-full justify-between ${
              open ? "visible" : "hidden"
            }`}
          >
            <div className="relative flex-grow  flex-shrink-0">
              <input
                id="searchField"
                placeholder="Search"
                className="w-full rounded-full px-3  input--field text-sm py-1"
                type="search"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setOpen(!open)}>
                <span className="">Cancel</span>
              </button>
            </div>
          </div>
        </div>
        <Table>
          <TableCaption>A list of your recent players.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-nowrap">Team Role</TableHead>
              {hasClaim(organization?.claims, "Permission.Groups.Delete") && (
                <TableHead>Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedGroup && selectedGroup?.members.length > 0 ? (
              selectedGroup?.members.map((player) => {
                return (
                  <TableRow key={player?.memberId}>
                    <TableCell>{player?.fName}</TableCell>
                    <TableCell>{player?.lName}</TableCell>
                    <TableCell>{player?.email}</TableCell>
                    <TableCell className="text-nowrap">
                      {player?.teamRole}
                    </TableCell>
                    {hasClaim(
                      organization?.claims,
                      "Permission.Groups.Delete"
                    ) && (
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <DeleteMember id={player?.memberId} />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No Player Yet!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default GroupContent;
