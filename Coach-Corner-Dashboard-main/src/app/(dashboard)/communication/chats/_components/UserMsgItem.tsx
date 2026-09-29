import { useSocket } from "@/context/SocketProvider";
import useApp from "@/context/useApp";
import { chatMemberMessage, chatMessage } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import { hoursAgo } from "@/lib/utils";
import React, { useEffect } from "react";
import { PiChecks, PiCheckThin } from "react-icons/pi";
type props = {
  item: chatMemberMessage;
  selected: any;
};
const getView = (selected: any, receiver: chatMessage): boolean => {
  let classes = false;
  if (selected?.userId == receiver?.senderId) {
    classes = false;
  } else {
    classes = true;
  }
  return classes;
};
const UserMsgItem = ({ item, selected }: props) => {
  const { selectedTeam, user } = useApp();
  const { currentUser } = useSocket();
  const { message } = item;
  // https://chatapi.thecoachcorner.com/api/chat/Messages/{teamId}/Direct/{msgId}/Viewed

  useEffect(() => {
    if (item) {
      let message = item?.message;
      if(message?.isViewd) return;
      //console.log("currently for viewed", message, user,currentUser);
      if (user?.id == message?.senderId) return;
      const setViewed = async () => {
        //console.log("setViewed", message, message?.id);
        try {
          const url = `/api/chat/Messages/${selectedTeam?.id}/Direct/${message?.id}/Viewed`;
          const res = await fetchClient(url, {}, false);
          //console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      setViewed();
    }
  }, [item]);

  return (
    <div
      className={`a-chat flex min-w-48 max-w-md px-2 mb-2 py-1 gap-2 ${
        getView(selected, message)
          ? "self-end items-end flex-row-reverse"
          : "self-start items-start"
      }`}
      key={message?.id}
    >
      <div
        className={`chat-message p-2 text-sm rounded-chat w-full ${
          getView(selected, message)
            ? "bg-chat-selected text-black rounded-br-none"
            : "bg-chat-message text-black rounded-tl-none"
        }`}
      >
        <div className="rte mb-1">{message?.content}</div>
        <div className="flex items-center justify-end gap-1">
          <div
            className={`text-xs ${
              getView(selected, message)
                ? "text-right text-black"
                : "text-gray-700 text-left"
            }`}
          >
            {hoursAgo(message?.dateTime)}
          </div>
          {getView(selected, message) &&
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

export default UserMsgItem;
