import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import { formatDate } from "@/lib/utils";
import React from "react";
import { TbCopy } from "react-icons/tb";
type props = {
  obj: {
    inviteCode: string;
    expireAt: string;
  } | null;
};
const SuccessLink = ({ obj }: props) => {
  const { setToaster } = useApp();
  const url = `${Site?.url}/invites/${obj?.inviteCode}`;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(url);
      setToaster("success", "Copied to clipboard");
    } catch (error) {
      console.log(error);
      setToaster("error", "Failed to copy to clipboard");
    }
  };
  return (
    <div className="py-6">
      <div className="flex items-center justify-center text-center flex-col gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="266"
          height="266"
          viewBox="0 0 266 266"
          className="w-40 h-40 mx-auto"
          fill="none"
        >
          <circle cx="133" cy="133" r="133" fill="#09203E" fillOpacity="0.06" />
          <circle
            cx="132.4"
            cy="133.4"
            r="106.4"
            fill="#09203E"
            fillOpacity="0.1"
          />
          <circle cx="133" cy="133" r="90" fill="#09203E" />
          <path
            d="M161 115.5L126 150.5L108.5 133"
            stroke="white"
            strokeWidth="5.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="mb-2">Successful!</h3>
        <div className="p-2 bg-gray-100 rounded flex items-center justify-start max-w-screen-sm mx-auto flex-col md:flex-row gap-2">
          <p className="text-xs md:text-sm text-primary md:truncate break-all">
            {url}
          </p>
          <button
            className="btn btn--primary text-sm"
            type="button"
            onClick={handleCopy}
          >
            <span>Copy</span>
            <TbCopy className="w-4 h-4 ms-2" />
          </button>
        </div>
        <p className="max-w-screen-sm mx-auto">
          Share this link with your team to invite them.
          {obj?.expireAt && (
            <span>
              {" "}
              This link will be expire on {formatDate(obj?.expireAt)}.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SuccessLink;
