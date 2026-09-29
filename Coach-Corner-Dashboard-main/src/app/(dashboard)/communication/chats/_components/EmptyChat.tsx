import React from "react";
import IconChat from "@/components/icons/EmptyChat";

const EmptyChat = () => {
  return (
    <div className="user-chat-header w-full px-3 py-2 h-full bg-chat-userbg flex items-center gap-3 justify-center flex-col text-center">
      <IconChat classes={"w-32 h-32"} />
      <h2 className="text-2xl mb-1">Welcome to Your Chat Space!</h2>
      <div className="rte max-w-96 mx-auto">
        {`Looks like it’s quiet here. Choose a friend from your contact list, and say hello! We're excited for you to start your first conversation.`}
      </div>
    </div>
  );
};

export default EmptyChat;
