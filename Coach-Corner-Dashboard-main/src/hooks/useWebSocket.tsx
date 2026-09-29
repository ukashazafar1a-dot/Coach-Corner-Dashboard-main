import { useEffect } from "react";
import { toast } from "sonner";
import { chatMemberMessage } from "@/helpers/types";
import { useSocket } from "@/context/SocketProvider";

const useWebSocket = (onNewMessage: (message: chatMemberMessage) => void) => {
  const { socket } = useSocket(); // Access the socket from context

  useEffect(() => {
    if (!socket) return; // Wait for socket to be initialized

    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        onNewMessage(message); // Pass message to the parent component via the callback
      } catch (error) {
        console.error("Failed to parse WebSocket message:", event.data);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, onNewMessage]);
};

export default useWebSocket;
