import { NoticeItem } from "@/helpers/types";
import { hoursAgo, timeAgo } from "@/lib/utils";
import React from "react";
type props = {
  active?: boolean;
  notice: NoticeItem;
  onSelect: (notice: NoticeItem) => void;
};
const NoticeCard = ({ active, notice, onSelect }: props) => {
  return (
    <div className="py-2 border-b">
      <div
        className={`w-full block p-2 rounded hover:bg-chat-selected cursor-pointer ${
          active ? "bg-chat-selected" : ""
        }`}
        onClick={() => onSelect(notice)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start justify-start gap-2">
            <img
              src={notice?.publisher?.image ? notice?.publisher?.image : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"}
              alt={notice?.publisher?.fName || "User Image"}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="block">
              <p className="font-semibold m-0 text-base leading-[16px]">
                {notice?.publisher?.fName} {notice?.publisher?.lName}
              </p>
              <span className="text-gray-400 text-sm">
                {notice?.publisher?.role}
              </span>
            </div>
          </div>
          <p
            className={`text-gray-700 text-xs ${
              notice?.isViewed && !active ? "text-gray-700" : "text-green-700"
            }`}
          >
            <span>{hoursAgo(notice?.dated)}</span>
            {!notice?.isViewed && !active ? (
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 ms-3"></span>
            ) : (
              <></>
            )}
          </p>
        </div>
        <p className="text-gray-600 text-sm three-lines">
          {notice?.shortDescription}
        </p>
      </div>
    </div>
  );
};

export default NoticeCard;
