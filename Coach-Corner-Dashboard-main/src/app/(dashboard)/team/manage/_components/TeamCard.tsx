import { TeamMemberItem } from "@/helpers/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import IconChat from "@/components/icons/IconChat";
import IconEdit from "@/components/icons/IconEdit";
import IconDelete from "@/components/icons/IconDelete";

type props = {
  member: TeamMemberItem;
};
const TeamCard = ({ member }: props) => {
  return (
    <Card className="rounded-sm shadow-none mb-3">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">First Name:</span>
          <span>{member?.fName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Last Name:</span>
          <span>{member?.lName}</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span className="font-medium">Email:</span>
          <span className="text-sm">{member?.email}</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span className="font-medium">Team Role:</span>
          <span className="text-sm">{member?.role}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-end gap-2 w-full">
          <Link href={`/communication/chats?view=${member?.teamMemberId}`}>
            <IconChat classes={"fill-primary cursor-pointer"} />
          </Link>
          <IconEdit classes={"fill-white cursor-pointer"} />
          <IconDelete classes={"cursor-pointer"} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
