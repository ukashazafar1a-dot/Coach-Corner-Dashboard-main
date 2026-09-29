import React from "react";
import ChatsPage from "./_components/ChatsPage";
import { SocketProvider } from "@/context/SocketProvider";

const page = () => {
  return (
    <SocketProvider>
      <ChatsPage />
    </SocketProvider>
  );
};

export default page;
