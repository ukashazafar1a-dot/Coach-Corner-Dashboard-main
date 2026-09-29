import { Group } from "@/helpers/types";
import React from "react";

type props = {
  group: Group;
  active?: boolean;
  changeGroup: (value: any) => void;
};

const GroupCard = ({ group, active, changeGroup }: props) => {
  return (
    <div
      className={`group--card ${active && "active"}`}
      onClick={() => changeGroup(group)}
    >
      <div className="lg:text-xl text-lg font-semibold">{group?.name}</div>
      <div className="flex justify-between pt-3 gap-3">
        <div className="flex-grow">
          <div className="text-base font-medium">Coach:</div>
          <div
            className={`text-sm text-slate-600 font-medium ${
              active ? "text-white" : ""
            } `}
          >
            {group?.coach?.fName} {group?.coach?.lName}
          </div>
        </div>
        <div className="border-l opacity-50 w-[1px] my-2 p-0 "><span></span></div>
        <div className="flex-shrink-0 basis-2/5">
          <div className="text-base font-medium">Member:</div>
          <div
            className={`lg:text-lg text-base font-medium text-slate-600 ${
              active ? "text-white" : ""
            }`}
          >
            {group?.members.length}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="94"
        height="21"
        viewBox="0 0 94 21"
        fill="none"
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 transition-colors duration-300"
      >
        <path
          d="M47 21C47 21 57.6634 14.1331 65.2053 10.5C75.7334 5.42827 94 0 94 0H0C0 0 19.5721 3.42827 30.1003 8.5C37.6421 12.1331 47 21 47 21Z"
          fill={`${active && "#3B7ABF"}`}
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
};

export default GroupCard;
