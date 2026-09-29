import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddMemberItem } from "@/helpers/types";
import { MdOutlineDelete } from "react-icons/md";
type props = {
  members: AddMemberItem[] | null;
  onRemove: (userId: any) => void;
};
const PlayerMembers = ({ members, onRemove }: props) => {
  if (!members || members?.length === 0) return <></>;
  return (
    <Table>
      <TableCaption>A list of your recent members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Team Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members?.map((invite, index: number) => {
          return (
            <TableRow key={index}>
              <TableCell>{invite?.fName}</TableCell>
              <TableCell>{invite?.lName}</TableCell>
              <TableCell>{invite?.email}</TableCell>
              <TableCell>{invite?.teamRole}</TableCell>
              <TableCell>
                <button type="button" onClick={() => onRemove(invite?.userId)}>
                  <MdOutlineDelete />
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PlayerMembers;
