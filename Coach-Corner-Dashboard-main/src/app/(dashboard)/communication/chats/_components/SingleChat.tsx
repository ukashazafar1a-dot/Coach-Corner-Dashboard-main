import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  chatMemberItem,
  chatMemberMessage,
  SocketMessage,
} from "@/helpers/types";
import IconSearch from "@/components/icons/IconSearch";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SendMessage from "./SendMessage";
import { getAvatar } from "@/lib/utils";
import { IoArrowBack } from "react-icons/io5";
import UserMsgItem from "./UserMsgItem";
import { useSocket } from "@/context/SocketProvider";
import { toast } from "sonner";

type props = {
  onBack: () => void;
};

const SingleChat = ({ onBack }: props) => {
  const { socket, currentUser, currentGroup, currentView } = useSocket();
  const { setToaster, selectedTeam, user } = useApp();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [messages, setMessages] = useState<chatMemberMessage[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentUserRef = useRef<chatMemberItem | null>(null);

  // Sync currentUser state with ref
  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const getMessages = async () => {
    //console.log("inside get messages", currentView, currentGroup, currentUser);
    try {
      setLoading(true);
      setProgress(20);
      let query = `/api/Chat/Messages/${selectedTeam?.id}/Direct/${currentUser?.userId}`;
      setProgress(40);
      const res = await fetchClient(query, {}, false);
      setProgress(60);
      if (res && res?.succeeded) {
        const { data } = res;
        setMessages(data);
        setProgress(80);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const handleRefetch = () => {
    getMessages();
  };

  const handleMessageAdd = useCallback(
    (message: chatMemberMessage) => {
      setMessages((prev) => {
        // Check if the message ID already exists in the array
        if (
          prev?.some(
            (existingMessage) =>
              existingMessage.message.id === message.message.id
          )
        ) {
          return prev; // Return the existing array if the message is a duplicate
        }
        return [...(prev || []), message]; // Add the new message if it's unique
      });
    },
    [
      /* dependencies */
    ]
  );
  useEffect(() => {
    setMessages(null);
    getMessages();
  }, [currentUser, currentGroup, currentView]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle incoming messages
  // Handle incoming messages
  const handleMessage = useCallback(
    (message: chatMemberMessage) => {
      const latestUser = currentUserRef.current; // Access the latest value
      //console.log("current receiver in handleMessage", latestUser);

      if (
        message?.message.receiverId === user?.id &&
        message?.message.senderId === latestUser?.userId
      ) {
        //console.log("Received message:", message, user, latestUser);
        handleMessageAdd(message);
      } else {
        console.log("no match");
      }
    },
    [user, handleMessageAdd] // handleMessageAdd must be memoized
  );

  // Fetch the SignalR connection and set up event listeners
  useEffect(() => {
    if (!socket) return;
    try {
      socket.onmessage = (event) => {
        // Assuming the message is JSON-encoded
        const res: SocketMessage = JSON.parse(event.data);
        //console.log("recieved message in single chat", res, user?.id);
        if (res?.type == "direct") {
          handleMessage({
            message: res.message,
            teamId: res?.teamId,
          });
        }
        if (res?.message.senderId !== user?.id) {
          toast.message("You have a new Message", {
            description: res?.message.content,
          });
        }
      };
    } catch (error) {
      console.error("Error with WebSocket connection:", error);
    }
  }, [socket]);

  // console.log("the user is now", currentUser);
  // console.log("inside single chat", messages, currentUser);
  return (
    <>
      <div className="user-chat-header bg-chat-selected relative flex items-center gap-3 justify-between w-full">
        <div className="user-info flex items-center gap-3 justify-between px-3 py-2">
          <button
            className="cursor-pointer md:hidden"
            type="button"
            onClick={onBack}
          >
            <IoArrowBack className="w-5 h-5 fill-primary text-primary" />
          </button>
          <div className="w-fit flex-shrink-0">
            <img
              className="h-8 md:h-12 w-8 md:w-12 flex-none rounded-full bg-gray-50"
              src={
                currentUser?.image
                  ? currentUser?.image
                  : getAvatar(currentUser?.teamMemberId)
              }
              alt={currentUser?.fName + " " + currentUser?.lName}
              loading="lazy"
            />
          </div>
          <div className="flex-grow">
            <p className="m-0 text-sm md:text-base font-medium one-line">
              {currentUser?.fName + " " + currentUser?.lName}
            </p>
            <div className="flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-xs leading-5 text-gray-500">Active Now</p>
            </div>
          </div>
        </div>
        <div className="messgae-search flex items-center px-3 py-2">
          <span onClick={() => setToggleSearch(!toggleSearch)}>
            <IconSearch classes={"fill-none stroke-primary cursor-pointer"} />
          </span>
          <input
            type="text"
            name="search"
            placeholder="Search a messge..."
            className={`bg-transparent text-sm focus:ring-0 border-0 border-b ${
              toggleSearch ? "w-auto px-3 py-1" : "w-0 p-0"
            } transition-all duration-300 focus:outline-none`}
          />
        </div>
        {loading && (
          <div
            className="h-0.5 absolute bottom-0 z-1 bg-red-400"
            style={{
              width: `${progress}%`,
            }}
          >
            <span></span>
          </div>
        )}
      </div>
      <div
        ref={messagesEndRef}
        className="user-chat-messages flex-grow flex flex-col items-center w-full p-2  h-full overflow-x-hidden overflow-y-auto"
      >
        {messages &&
          messages?.map((message, index) => {
            //console.log(message)
            return (
              <UserMsgItem item={message} key={index} selected={currentUser} />
            );
          })}
      </div>
      <div className="user-chat-actions px-3 w-full py-2 bg-blur">
        <SendMessage
          handleRefetch={handleRefetch}
          handleMessageAdd={handleMessageAdd}
        />
      </div>
    </>
  );
};

export default SingleChat;
