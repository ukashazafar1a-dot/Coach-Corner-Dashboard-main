import PlusIcon from "@/components/icons/PlusIcon";
import React, { useState } from "react";
import AddMember from "./AddMember";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GroupInviteItem } from "@/helpers/types";
import { MdOutlineDelete } from "react-icons/md";

type props = {
  invites: GroupInviteItem[] | null;
  onChange: any;
  init: boolean;
  onInitChange: (value: boolean) => void;
  onRemove: (email: string) => void;
};
const GroupMembers = ({
  onChange,
  invites,
  init,
  onInitChange,
  onRemove,
}: props) => {
  return (
    <>
      {invites && invites?.length > 0 ? (
        <>
        <h2 className="text-2xl font-semibold mb-4">New Invite Members</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Team Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites?.map((invite: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {invite?.fName} {invite.lName}
                  </TableCell>
                  <TableCell>{invite?.email}</TableCell>
                  <TableCell>{invite?.role}</TableCell>
                  <TableCell>{invite?.teamRole}</TableCell>
                  <TableCell>
                    <button type="button" onClick={() => onRemove(invite?.email)}>
                      <MdOutlineDelete />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </>
      ) : (
        <></>
      )}

      {init && (
        <AddMember
          key={"add"}
          onChange={onChange}
          onRemove={() => onInitChange(false)}
        />
      )}
      {!init && (
        <div className="py-2 flex items-start justify-start">
          <button
            type="button"
            className="py-2"
            onClick={() => onInitChange(true)}
          >
            <PlusIcon classes="inline-block pe-1 text-themePrimary" />
            <span className="text-themePrimary text-sm font-medium">
              Invite New Members
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default GroupMembers;
