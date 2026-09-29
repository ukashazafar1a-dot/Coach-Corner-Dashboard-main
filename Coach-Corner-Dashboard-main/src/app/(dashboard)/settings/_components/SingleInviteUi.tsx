"use client";
import useApp from "@/context/useApp";
import Image from "next/image";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const SingleInviteUi = () => {
  const {user} = useApp();
  return (
    <div className="p-3">
      <div className="max-w-screen-md me-auto">
        <div className="flex items-center justify-center gap-3 py-6">
          <img
            src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
            alt=""
            className="max-w-full rounded-full w-16 h-16"
          />
          <IoIosArrowRoundForward className="w-6 h-6" />
          <img
            src={user?.image ? user?.image : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"}
            alt=""
            className="max-w-full rounded-full w-16 h-16"
          />
        </div>
        <div className="text-center mb-3">
          <div className="flex items-center justify-center flex-wrap gap-3 mb-3">
            <span>[Coach Name] invited you to join </span>
            <div className="flex items-center justify-start gap-3">
              <Image
                src={
                  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
                }
                width={40}
                height={40}
                alt="Team Avatar"
                className="rounded-full w-10 h-10"
              />
              <p className="font-semibold capitalize">[Team Name]</p>
            </div>
            <p>from the organization</p>
            <div className="flex items-center justify-center gap-3">
              <Image
                src={
                  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
                }
                width={40}
                height={40}
                alt="Team Avatar"
                className="rounded-full w-10 h-10"
              />
              <p className="font-semibold capitalize">[Organization Name]</p>
            </div>
          </div>
          <p className="text-base text-gray-600">Invitation expire in 3 days</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button className="btn btn--secondary">Decline</button>
          <button className="btn btn--primary">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default SingleInviteUi;
