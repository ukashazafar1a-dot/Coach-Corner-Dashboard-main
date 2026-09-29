import React from "react";
import { MdOutlineDoNotTouch } from "react-icons/md";
import Link from "next/link";
import { Site } from "@/helpers/Site";
import AccessDenied from "./icons/AccessDenied";

type props = {
  message?: string;
};
const NoPermissionCard = ({ message }: props) => {
  return (
    <div className="p-3 text-center flex items-center justify-center min-h-[70vh]">
      <div className="shadow p-8 border border-gray-100 rounded">
        <div className="flex items-center justify-center flex-col">
          <AccessDenied classes="mx-auto"/>
          <h2 className="text-2xl mt-5 mb-1">
            There is a problem loading this page.
          </h2>
          {message && (
            <div
              className="mb-3 text-red-600 font-medium"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          <p className="mb-4">{`
            You don't have permission to view this page. Please contact your
            admin to get permissions to view this page.
          `}</p>
          <Link
            href={`mailto:${Site?.email}`}
            target="_blank"
            className="btn btn--primary"
          >
            Request Access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPermissionCard;
