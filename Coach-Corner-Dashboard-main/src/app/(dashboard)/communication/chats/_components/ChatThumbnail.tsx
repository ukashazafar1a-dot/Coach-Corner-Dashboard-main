import { chatMemberItem } from "@/helpers/types";
import { getAvatar } from "@/lib/utils";
import React from "react";

type Props = {
  chat: chatMemberItem;
  active?: boolean;
  onChange?: (chat: chatMemberItem) => void;
};

function ChatThumbnail({ chat, active, onChange }: Props) {
  return (
    <div
      key={chat?.userId}
      className={`single-chat relative cursor-pointer flex items-start justify-start gap-2 p-2 rounded-chat mt-2 hover:bg-chat-selected ${
        active && "bg-chat-selected"
      }`}
      onClick={() => onChange && onChange(chat)}
    >
      <div className="basis-auto max-w-14 flex-shrink-0">
        <img
          className="inline-block h-8 md:h-12 w-8 md:w-12 rounded-full bg-gray-50"
          src={chat?.image ? chat?.image : getAvatar(chat?.teamMemberId)}
          alt={chat?.fName}
        />
      </div>
      <div className="flex-grow">
        <p className="m-0 text-sm md:text-base font-medium one-line">
          {chat?.fName} {chat?.lName}
        </p>
        <p className="m-0  text-sm text-gray-600 one-line">
          {chat?.role}
        </p>
      </div>
      {chat?.newMsgCount > 0 && (
        <p className="text-[8px] p-1 leading-none rounded-full bg-primary text-white right-1 bottom-2 absolute">
          {chat?.newMsgCount}
        </p>
      )}
    </div>
  );
}

export default ChatThumbnail;
