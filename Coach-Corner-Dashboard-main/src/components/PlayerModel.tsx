import CloseIcon from "@/components/icons/CloseIcon";
import IconChat from "@/components/icons/IconChat";
import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import { GroupMemberItem, Member, MemberItem } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import { formatDate, getAvatar, returnAge } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SectionLoader from "./loaders/SectionLoader";
type props = {
  open: boolean;
  handleClose: any;
  player: MemberItem;
};
const PlayerModel = ({ open, handleClose, player }: props) => {
  const [member, setMember] = useState<GroupMemberItem | null>(null);
  const [loading, setLoading] = useState(false);
  const { setToaster, selectedTeam } = useApp();

  const getPlayer = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/Groups/Members/${player?.memberId}/Detail`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setMember(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (open) {
      getPlayer();
    }
  }, [open]);
  console.log(member);
  return (
    <>
      <style jsx global>
        {`
          .player--card {
            display: none;
          }
        `}
      </style>
      <div className="w-full overflow-y-auto h-full pt-2 min-h-[400px]">
        <div
          className={`p-3 sm:p-0 relative transform border border-gray-400 overflow-hidden rounded-lg bg-white shadow-sm text-left transition-all ease-out duration-300 h-full w-full ${
            open
              ? "opacity-100 translate-y-0 sm:scale-100"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          }`}
        >
          <div className="bg-white p-0 sm:p-6">
            {loading ? (
              <SectionLoader />
            ) : (
              <div className="flex items-start justify-center inner-some flex-col md:flex-row relative">
                <div className="content-part basis-9/12 flex-shrink-0 mt-5">
                  <h2 className="text-primary mb-1">
                    {member?.fName} {member?.lName}
                  </h2>
                  <p className="text-base text-primary font-medium mb-2">
                    {member?.teamRole}
                  </p>
                  <div className="image-part md:hidden">
                    <div
                      className="close-btn text-black absolute -top-1 right-0 z-2 bg-gray-100 p-2 rounded-full cursor-pointer"
                      onClick={() => handleClose()}
                    >
                      <CloseIcon
                        classes={"fill-black text-black stroke-black w-4 h-4"}
                      />
                    </div>
                    <div className="relative w-full mb-2">
                      <div className="card-block h-80 w-full overflow-hidden flex items-center justify-center">
                        <img
                          src={member?.image ? member?.image : getAvatar()}
                          alt="Player Background"
                          className="mx-auto relative z-1"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-center gap-3 mb-3 flex-wrap md:justify-start">
                    {member?.personalClaims?.dob && (
                      <div className="pe-2">
                        <p className="text-gray-600">Age:</p>
                        <p className="font-semibold">
                          {returnAge(member?.personalClaims?.dob) + " years"}
                        </p>
                      </div>
                    )}
                    {member?.personalClaims?.height && (
                      <div className="px-2">
                        <p className="text-gray-600">Height:</p>
                        <p className="font-semibold">
                          {member?.personalClaims?.height + " ft"}
                        </p>
                      </div>
                    )}
                    {member?.personalClaims?.weight && (
                      <div className="px-2">
                        <p className="text-gray-600">Weight:</p>
                        <p className="font-semibold">
                          {member?.personalClaims?.weight + " kg"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-start gap-3 mb-3 flex-wrap">
                    {member?.email && (
                      <div className="pe-2">
                        <p className="text-gray-600">Email:</p>
                        <p className="font-semibold">{member?.email}</p>
                      </div>
                    )}
                    {member?.phoneNumber && (
                      <div className="md:px-2">
                        <p className="text-gray-600">Phone no:</p>
                        <p className="font-semibold">
                          {member?.phoneNumber}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-start gap-3 mb-3 flex-wrap">
                    {member?.personalClaims?.parentName && (
                      <div className="pe-2">
                        <p className="text-gray-600">Parent Name:</p>
                        <p className="font-semibold">
                          {member?.personalClaims?.parentName}
                        </p>
                      </div>
                    )}
                     {member?.personalClaims?.parentNumberPrimary && (
                      <div className="md:px-2">
                        <p className="text-gray-600">Parent Contact:</p>
                        <p className="font-semibold">
                          {member?.personalClaims?.parentNumberPrimary}
                        </p>
                      </div>
                    )}
                    {member?.personalClaims?.parentNumberSecondary && (
                      <div className="md:px-2">
                        <p className="text-gray-600">Parent Contact:</p>
                        <p className="font-semibold">
                          {member?.personalClaims?.parentNumberSecondary}
                        </p>
                      </div>
                    )}
                    {member?.personalClaims.parentEmail && (
                      <div className="pe-2">
                        <p className="text-gray-600">Parent Email:</p>
                        <p className="font-semibold">
                          {member?.personalClaims?.parentEmail}
                        </p>
                      </div>
                    )}
                  </div>
                  {member?.bio && (
                    <div className="about mb-3">
                      <div className="font-medium">About Player:</div>
                      <div className="rte">{member?.bio}</div>
                    </div>
                  )}
                </div>
                <div className="image-part relative hidden md:block">
                  <div
                    className="close-btn text-black absolute -top-1 right-1 z-2 bg-gray-100 p-2 rounded-full cursor-pointer"
                    onClick={() => handleClose()}
                  >
                    <CloseIcon
                      classes={"fill-black text-black stroke-black w-4 h-4"}
                    />
                  </div>
                  <div className="relative w-full mb-2">
                    <div className="card-block h-80 w-full overflow-hidden flex items-center justify-center">
                      <img
                        src={member?.image ? member?.image : getAvatar()}
                        alt="Player Background"
                        className="mx-auto relative z-1"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="chat-icon bg-primary p-2 rounded-full absolute bottom-1 right-2 cursor-pointer z-2">
                  <IconChat classes={"fill-white w-4 h-4"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerModel;
