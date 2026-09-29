import EmptyChat from "@/components/icons/EmptyChat";
import useApp from "@/context/useApp";
import { hasClaim } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const CreateNotice = () => {
  const { organization } = useApp();
  return (
    <div className="user-chat-header w-full h-full bg-chat-userbg flex items-center gap-3 justify-center flex-col text-center rounded py-16 px-4">
      <EmptyChat classes={"w-32 h-32"} />
      <h2 className="text-2xl mb-1">Welcome to Your Notice Board!</h2>
      <div className="rte max-w-96 mx-auto">
        {`Let's get started with notices. Create your first notice.`}
      </div>
      {hasClaim(organization?.claims, "Permission.Noticeboards.Create") && (
        <Link
          href={"/communication/notice-board/create"}
          className="btn btn--secondary w-fit mx-auto"
        >
          <span>Add Notice</span>
        </Link>
      )}
    </div>
  );
};

export default CreateNotice;
