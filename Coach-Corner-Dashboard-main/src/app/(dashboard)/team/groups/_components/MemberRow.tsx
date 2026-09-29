"use client";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import IconChat from "@/components/icons/IconChat";
import IconDelete from "@/components/icons/IconDelete";
import IconEdit from "@/components/icons/IconEdit";
import Link from "next/link";
import React, { useState } from "react";
type props = {
  player: any;
};

const MemberRow = ({ player }: props) => {
  const [openState, setOpenState] = useState(false);

  const toggleOpen = () => {
    setOpenState(!openState);
  };

  return (
    <>
      <tr className={` ${openState ? "tbl-bg" : ""} `}>
        <td className="tbl-data  text-blueGray-700 ">{player.name}</td>
        <td className="tbl-data">{player.lastName}</td>
        <td className="tbl-data max-md:hidden">{player.email}</td>
        <td className="tbl-data max-md:hidden">{player.role}</td>
        <td className="tbl-data max-w-23 max-md:hidden">
          <div className="flex items-center gap-2 justify-end w-full">
            {player.status === "Active" && (
              <Link href={`/communication/chats?view=${player.id}`}>
                <IconChat classes={"fill-primary cursor-pointer"} />
              </Link>
            )}
            <IconEdit classes={"fill-white cursor-pointer"} />
            <IconDelete classes={"cursor-pointer"} />
          </div>
        </td>
        <td className="md:hidden cursor-pointer ">
          <div
            className="flex items-center justify-center"
            onClick={() => toggleOpen()}
          >
            <ArrowDownIcon
              classes={`h-4 w-4 ${
                openState
                  ? "rotate-180 transition-transform duration-300  "
                  : "transition-transform duration-300"
              } `}
            />
          </div>
        </td>
      </tr>
      {openState && (
        <tr className={`md:hidden transition-all duration-300`}>
          <td colSpan={6} className="px-6  bg-white">
            <div className="w-full py-2 border-t-2 border-[#DDDDD]">
              <div className="font-bold text-sm">Email</div>
              <div className=" text-xs whitespace-nowrap pt-1 ">
                {player.email}
              </div>
            </div>
            <div className="font-bold text-sm pt-3">Team Role</div>
            <div className=" text-xs whitespace-nowrap pt-1 ">
              {player.role}
            </div>
            <div className="flex items-center gap-5 justify-center w-full my-2">
              {player.status === "Active" && (
                <Link href={`/communication/chats?view=${player.id}`}>
                  <IconChat classes={"fill-primary cursor-pointer"} />
                </Link>
              )}
              <IconEdit classes={"fill-white cursor-pointer"} />
              <IconDelete classes={"cursor-pointer"} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default MemberRow;
