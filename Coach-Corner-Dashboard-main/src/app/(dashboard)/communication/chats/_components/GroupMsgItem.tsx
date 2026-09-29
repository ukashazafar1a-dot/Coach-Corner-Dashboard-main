import { useSocket } from "@/context/SocketProvider";
import useApp from "@/context/useApp";
import { chatGroupMessage } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import { hoursAgo } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { PiChecks, PiCheckThin } from "react-icons/pi";
type props = {
  item: chatGroupMessage;
};
const GroupMsgItem = ({ item }: props) => {
  const { selectedTeam } = useApp();
  const { currentGroup, currentUser } = useSocket();
  const [active,setActive] = useState(false);
  const { message } = item;
  // https://chatapi.thecoachcorner.com/api/chat/Messages/{teamId}/Group/{groupId}/{msgId}/Viewed

  useEffect(() => {
    if (item) {
      if(item?.message?.senderId){
        setActive(true)
      }else{
        setActive(false);
      }
      let { message } = item;
      if (!message || !message?.isViewd) return;
      const setViewed = async () => {
        try {
          const url = `/api/chat/Messages/${selectedTeam?.id}/Group/${currentGroup?.id}/${message?.id}/Viewed`;
          const res = await fetchClient(url, {}, false);
          //console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      setViewed();
    }
  }, [item]);
  //console.log(active, message);
  return (
    <div
      className={`a-chat flex relative w-fit max-w-md px-2 mb-2 py-1 gap-2 ${
        active
          ? "self-end items-end flex-row-reverse"
          : "self-start items-start"
      }`}
      key={message?.id}
    >
      {!active && (
        <img
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-50"
          src={
            message?.sender?.image
              ? message?.sender?.image
              : `https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
          }
          alt={message?.sender?.fName}
          loading="lazy"
        />
      )}
      {!active && message?.sender && (
        <p className="absolute text-[12px] top-[8px] leading-[14px] left-12 font-medium text-red-600">
          {message?.sender?.fName + " " + message?.sender?.lName}
        </p>
      )}
      <div
        className={`chat-message p-2 text-sm rounded-chat min-w-48 ${
          active
            ? "bg-chat-selected text-black rounded-br-none"
            : "bg-chat-message text-black rounded-tl-none pt-3"
        }`}
      >
        <div className={`rte ${active ? "mb-1" : "py-2"}`}>
          {message?.content}
        </div>
        <div className="flex items-center justify-end gap-1">
          <div
            className={`text-[12px] leading-[14px] ${
              active ? "text-right text-black" : "text-gray-700 text-left"
            }`}
          >
            {hoursAgo(message?.dateTime)}
          </div>
          {active &&
            (message?.isViewd ? (
              <PiChecks className="w-3 h-3 fill-black" />
            ) : (
              <PiCheckThin className="w-3 h-3 fill-black" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupMsgItem;
