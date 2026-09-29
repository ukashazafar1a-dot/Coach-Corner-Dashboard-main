import EmptyChat from "@/components/icons/EmptyChat";
import React from "react";

const EmptyNotice = () => {
  return (
    <div className="user-chat-header w-full px-3 py-2 h-full bg-chat-userbg flex items-center gap-3 justify-center flex-col text-center">
      <EmptyChat classes={"w-32 h-32"} />
      <h2 className="text-2xl mb-1">Welcome to Your Notice Board!</h2>
      <div className="rte max-w-96 mx-auto">
        {`Let's get started with your first notice. Select a notice to view or edit.`}
      </div>
    </div>
  );
};

export default EmptyNotice;
