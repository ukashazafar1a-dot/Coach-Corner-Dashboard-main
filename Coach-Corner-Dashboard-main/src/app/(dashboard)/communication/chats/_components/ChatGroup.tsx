import { chatGroupItem } from "@/helpers/types";
import { getAvatar } from "@/lib/utils";
import React from "react";

type Props = {
  chat: chatGroupItem;
  active?: boolean;
  onChange: (chat: chatGroupItem) => void;
};

function ChatGroup({ chat, active, onChange }: Props) {
  return (
    <div
      key={chat?.id}
      className={`single-chat cursor-pointer relative flex items-start justify-start gap-2 p-2 rounded-chat mt-2 hover:bg-chat-selected ${
        active && "bg-chat-selected"
      }`}
      onClick={() => onChange(chat)}
    >
      <div className="basis-auto max-w-14 flex-shrink-0">
        <img
          className="inline-block h-12 w-12 rounded-full bg-gray-50"
          src={chat?.image ? chat?.image : getAvatar()}
          alt={chat?.name}
        />
      </div>
      <div className="flex-grow">
        <p className="m-0 text-lg font-medium one-line">{chat?.name}</p>
      </div>
      {chat?.msgCount > 0 && (
        <p className="text-[8px] p-1 leading-none rounded-full bg-primary text-white right-1 bottom-2 absolute">
          {chat?.msgCount}
        </p>
      )}
    </div>
  );
}

export default ChatGroup;
