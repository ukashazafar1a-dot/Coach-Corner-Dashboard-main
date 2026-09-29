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

const AddGroupRow = ({ player }: props) => {
  const [openState, setOpenState] = useState(false);

  const toggleOpen = () => {
    setOpenState(!openState);
  };
  const status = "active";
  return (
    <>
      <tr className={` ${openState ? "tbl-bg" : ""} `}>
        <td className="tbl-data  text-blueGray-700 max-sm:px-1 ">
          {player.firstName}
        </td>
        <td className="tbl-data max-sm:px-1">{player.lastName}</td>

        <td className="tbl-data max-md:hidden max-sm:px-1 ">{player.email}</td>
        <td className="tbl-data max-md:hidden">{player.teamRole}</td>
        <td className="tbl-data max-w-23 max-md:max-w-fit max-md:px-1">
          {/* <div className="flex items-center gap-2 justify-end w-full">
            {player.status === "Active" ? (
              <>
                <Link href={`/communication/chats?view=${player.id}`}>
                  <Button
                    title="Added"
                    classes={`${"bg-[#3B7ABF3D] text-sm max-md:text-xs py-1 px-1 border-0 btn text-themePrimary min-w-[85px] max-md:min-w-[60px]"}`}
                  />
                </Link>
              </>
            ) : (
              <>
                <Button
                  title="Add"
                  classes={`${"btn text-sm max-md:text-xs py-1 px-1 btn--primary border-0 min-w-[88px] max-md:min-w-[60px] "}`}
                />
              </>
            )}
          </div> */}
        </td>
        <td className="md:hidden cursor-pointer  ">
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
          <td colSpan={6} className="px-6 max-sm:px-2  bg-white">
            <div className="w-full py-2 border-t-2 border-[#DDDDD]">
              <div className="font-bold text-sm">Email</div>
              <div className=" text-xs whitespace-nowrap pt-1 ">
                {player.email}
              </div>
            </div>
            <div className="font-bold text-sm pt-3">Team Role</div>
            <div className=" text-xs whitespace-nowrap pt-1 ">
              {player.teamRole}
            </div>
            {/* <div className="flex items-center gap-5 justify-center w-full my-2">
              {player.status === "Active" ? (
                <>
                  <Link href={`/communication/chats?view=${player.id}`}>
                    <Button
                      title="Added"
                      classes={`${"bg-[#3B7ABF3D] text-sm py-1 px-1 border-0 btn text-themePrimary min-w-[80px]"}`}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    title="Add"
                    classes={`${"btn text-sm py-1 px-1 btn--primary border-0 min-w-[88px] "}`}
                  />
                </>
              )}
            </div> */}
          </td>
        </tr>
      )}
    </>
  );
};

export default AddGroupRow;
