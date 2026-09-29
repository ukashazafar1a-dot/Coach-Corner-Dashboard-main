import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import { InviteLinkItem } from "@/helpers/types";
import React from "react";
type props = {
  link: InviteLinkItem;
};
const CopyLink = ({ link }: props) => {
  const { setToaster } = useApp();
  const handleCopy = async () => {
    try {
      const url = `${Site?.url}/invites/${link?.inviteCode}`;
      await navigator.clipboard.writeText(url);
      setToaster("success", "Link copied successfully");
    } catch (error) {
      console.log(error);
      setToaster("error", "Something went wrong");
    }
  };
  return (
    <button
      className="btn btn--primary"
      disabled={link?.type === "Email"}
      onClick={handleCopy}
    >
      Copy Link
    </button>
  );
};

export default CopyLink;
