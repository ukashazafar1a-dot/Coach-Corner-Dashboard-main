import TopBar from "@/components/TopBar";
import React from "react";
import NoticeForm from "./NoticeForm";

const CreateNoticePage = () => {
  return (
    <div>
      <TopBar title="Notice Board" />
      <NoticeForm />
    </div>
  );
};

export default CreateNoticePage;
