import React, { useEffect, useState } from "react";
import ChatThumbnail from "./ChatThumbnail";
import IconSearch from "@/components/icons/IconSearch";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import { chatGroupItem, chatMemberItem, SocketMessage } from "@/helpers/types";
import ChatLoader from "@/components/loaders/ChatLoader";
import ChatGroup from "./ChatGroup";
import EmptyChat from "./EmptyChat";
import SingleChat from "./SingleChat";
import { hasClaim, isDeviceMobile } from "@/lib/utils";
import { useSocket } from "@/context/SocketProvider";
import { useWebNotification } from "@/hooks/useWebNotification";
import GroupChat from "./GroupChat";

type chat = "Chat" | "Groups";

const ChatContent = () => {
  const [chatView, setChatView] = useState<chat>("Chat");
  const [toggleSearch, setToggleSearch] = useState(false);
  const { user, selectedTeam, setToaster, organization } = useApp();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<chatMemberItem[] | null>(null);
  const [groups, setGroups] = useState<chatGroupItem[] | null>(null);
  const [mobile, setMobile] = useState(false);
  const {
    getConnection,
    setCurrentUser,
    setCurrentGroup,
    currentUser,
    currentGroup,
    currentView,
    socket,
  } = useSocket();
  const { sendMessage } = useWebNotification();

  const handleSelected = (member: any, type: "group" | "user") => {
    if (type === "group") {
      setCurrentGroup(member);
    } else {
      setCurrentUser(member);
    }
    if (isDeviceMobile()) {
      setMobile(!mobile);
    }
  };

  const getGroups = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/Groups/${selectedTeam?.id}/ChatGroups`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setGroups(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getMembers = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/${selectedTeam?.id}/ChatMembers`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setMembers(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasClaim(organization?.claims, "Permission.Chats.DirectMessage")) {
      getMembers();
    }
    if (hasClaim(organization?.claims, "Permission.Chats.GroupMessage")) {
      getGroups();
    }
    if (isDeviceMobile()) {
      setMobile(true);
    }
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.onmessage = (event: MessageEvent) => {
  //       try {
  //         const message: SocketMessage = JSON.parse(event.data);
  //         console.log("WebSocket message received in chat content:", message);
  //       } catch (error) {
  //         console.error("Failed to parse WebSocket message:", event.data);
  //       }
  //     };
  //   }
  // }, [socket]);
  //console.log(chatView, selected);
  return (
    <>
      <div className="border border-primary rounded-chat flex justify-center chat-module overflow-hidden relative">
        <div
          className={`user--list basis-3/12 w-full bg-chat-userbg p-3 h-full overflow-x-hidden overflow-y-auto absolute top-0 left-0 lg:block lg:static ${
            mobile ? "active-now" : ""
          }`}
        >
          <div className="group my-2 sticky top-0">
            <div className="actions flex items-center justify-end gap-2 mb-2">
              <div className="chat-search flex items-center">
                <span onClick={() => setToggleSearch(!toggleSearch)}>
                  <IconSearch
                    classes={"fill-none stroke-primary cursor-pointer"}
                  />
                </span>
                <input
                  type="text"
                  name="search"
                  className={`border-0 border-b max-w-40 bg-transparent focus:ring-0 ${
                    toggleSearch ? "w-auto px-2 py-0" : "w-0 p-0"
                  } transition-all duration-300 focus:outline-none`}
                />
              </div>
              {/* <IconNewChat classes={"fill-none"} /> */}
            </div>
            {hasClaim(organization?.claims, "Permission.Chats.DirectMessage") &&
              hasClaim(
                organization?.claims,
                "Permission.Chats.GroupMessage"
              ) && (
                <div className="chat--tabs bg-chat-actions p-1 flex items-center justify-center flex-initial mb-2 rounded-md">
                  {hasClaim(
                    organization?.claims,
                    "Permission.Chats.DirectMessage"
                  ) && (
                    <button
                      className={`btn border-0 flex-grow ${
                        chatView == "Chat"
                          ? "btn--primary"
                          : "btn--secondary no-underline text-primary"
                      }`}
                      onClick={() => setChatView("Chat")}
                    >
                      Chat
                    </button>
                  )}
                  {hasClaim(
                    organization?.claims,
                    "Permission.Chats.GroupMessage"
                  ) && (
                    <button
                      className={`btn border-0 flex-grow ${
                        chatView == "Groups"
                          ? "btn--primary"
                          : "btn--secondary no-underline text-primary"
                      }`}
                      onClick={() => setChatView("Groups")}
                    >
                      Groups
                    </button>
                  )}
                </div>
              )}
          </div>
          {loading ? (
            <ChatLoader />
          ) : (
            <div className="chat-lists">
              {chatView == "Chat" &&
              hasClaim(
                organization?.claims,
                "Permission.Chats.DirectMessage"
              ) ? (
                members &&
                members?.map((chat) => {
                  return (
                    <ChatThumbnail
                      chat={chat}
                      key={chat?.userId}
                      active={currentUser?.userId == chat?.userId}
                      onChange={(chat) => handleSelected(chat, "user")}
                    />
                  );
                })
              ) : (
                <></>
              )}
              {chatView == "Groups" &&
              hasClaim(
                organization?.claims,
                "Permission.Chats.GroupMessage"
              ) ? (
                groups &&
                groups?.map((chat) => {
                  return (
                    <ChatGroup
                      chat={chat}
                      key={chat?.id}
                      active={currentGroup?.id == chat?.id}
                      onChange={(chat) => handleSelected(chat, "group")}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        <div className="user--chat basis-full flex justify-between flex-col h-full lg:basis-9/12">
          {currentView == "Direct" ? (
            currentUser ? (
              <SingleChat onBack={() => setMobile(!mobile)} />
            ) : (
              <EmptyChat />
            )
          ) : currentGroup ? (
            <GroupChat onBack={() => setMobile(!mobile)} />
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatContent;
