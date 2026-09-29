import PlusIcon from "@/components/icons/PlusIcon";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberItem } from "@/helpers/types";
import { MdOutlineDelete } from "react-icons/md";
import AddMember from "./AddMember";
import DeleteMember from "../../_components/DeleteMember";

type props = {
  invites: MemberItem[] | null;
  onChange: any;
  init: boolean;
  onInitChange: (value: boolean) => void;
  onRemove: (email: string) => void;
  handleRefetch: () => void;
};
const GroupMembers = ({
  onChange,
  invites,
  init,
  onInitChange,
  onRemove,
  handleRefetch,
}: props) => {
  return (
    <>
      
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
          {invites && invites?.length > 0 ? (
            invites?.map((invite, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {invite?.fName} {invite.lName}
                  </TableCell>
                  <TableCell>{invite?.email}</TableCell>
                  <TableCell>{invite?.role}</TableCell>
                  <TableCell>{invite?.teamRole}</TableCell>
                  <TableCell>
                    <DeleteMember
                      id={invite?.memberId}
                      handleRefetch={handleRefetch}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Member yet!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default GroupMembers;
