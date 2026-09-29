"use client";
import useApp from "@/context/useApp";
import React from "react";

const UserBlock = () => {
  const { user } = useApp();
  return (
    <div className="flex items-center justify-start gap-3 mb-5">
      <img
        src={
          user?.image ? user?.image : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
        }
        alt="Selected Icon"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="text-lg mb-0 font-semibold">{user?.fName} {user?.lName ? user?.lName : ""}</p>
        <p className="text-sm text-gray-400">Your personal account</p>
      </div>
    </div>
  );
};

export default UserBlock;
