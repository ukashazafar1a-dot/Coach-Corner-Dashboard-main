import React, { useEffect, useState } from "react";
import IconPin from "@/components/icons/IconPin";
import IconSend from "@/components/icons/IconSend";
import IconSmile from "@/components/icons/IconSmile";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatMemberMessage } from "@/helpers/types";
import { useSocket } from "@/context/SocketProvider";
import { emojis } from "@/helpers/emojis";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type props = {
  handleRefetch: () => void;
  handleMessageAdd: (message: chatMemberMessage) => void;
};
const SendMessage = ({ handleRefetch, handleMessageAdd }: props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToaster, selectedTeam } = useApp();
  const { currentUser, currentGroup, currentView } = useSocket();
  const [open, setOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || message.length < 1) {
      setToaster("error", "Please enter a message");
      return;
    }
    try {
      setLoading(true);
      let query = "";
      if (currentView == "Group") {
        query = `/api/Chat/Messages/${selectedTeam?.id}/Group/${currentGroup?.id}/Send`;
      } else {
        query = `/api/Chat/Messages/${selectedTeam?.id}/Direct/Send`;
      }
      let data = {};
      if (currentView == "Group") {
        data = { id: null, message };
      } else {
        data = { id: null, message, receiverId: currentUser?.userId };
      }
      const res = await fetchClient(
        query,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
        false
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setMessage("");
        handleMessageAdd(res?.data);
        //handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //console.log(emojis);
  useEffect(() => {
    setMessage("");
  }, [currentUser, currentGroup, currentView]);

  return (
    <>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex items-center justify-center gap-2"
      >
        <div className="quick-actions flex items-center gap-2">
          <IconPin />
          <Popover open={open} onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger>
              <IconSmile />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <div className="flex items-start flex-wrap overflow-auto max-h-80 justify-evenly">
                {emojis?.map((emoji, index) => {
                  if (emoji?.category != "Smileys & Emotion") return;
                  return (
                    <span
                      className="text-xl p-1 cursor-pointer hover:border-gray-50 border border-transparent"
                      key={index}
                      onClick={() => {
                        setMessage(message + emoji?.emoji);
                        setOpen(false);
                      }}
                    >
                      {emoji?.emoji}
                    </span>
                  );
                })}
                <hr />
                {emojis?.map((emoji, index) => {
                  if (emoji?.category != "People & Body") return;
                  return (
                    <span
                      className="text-xl p-1 cursor-pointer hover:border-gray-50 border border-transparent"
                      key={index}
                      onClick={() => {
                        setMessage(message + emoji?.emoji);
                        setOpen(false);
                      }}
                    >
                      {emoji?.emoji}
                    </span>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="input-wrap w-full">
          <input
            type="text"
            name="message"
            className="input--field w-full rounded-full px-3 py-1 text-sm md:text-base"
            placeholder="Type a message"
            value={message}
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)}
            min={1}
          />
        </div>
        <button
          type="submit"
          className="sendbtn bg-primary rounded-full p-1"
          disabled={loading || message.length < 1}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="w-4 h-4 fill-white animate-spin" />
          ) : (
            <IconSend />
          )}
        </button>
      </form>
    </>
  );
};

export default SendMessage;
