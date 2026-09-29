import TopBar from "@/components/TopBar";
import React from "react";
import PlaybookCards from "./PlaybookCards";

const SinglePlayBook = () => {
  return (
    <div>
      <TopBar title="Back to Playbooks" />
      <div className="p-4">
        <PlaybookCards/>
      </div>
    </div>
  );
};

export default SinglePlayBook;
