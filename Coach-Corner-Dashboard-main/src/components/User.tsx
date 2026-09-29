"use client";
import useApp from "@/context/useApp";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const User = () => {
  const { user,sidebarOpened, openSidebar } = useApp();
  if (!user) return <></>;
  return (
    <div className="flex gap-3 items-center rounded-lg bg-themeSecondary p-3 user-card mb-2" onClick={() => openSidebar(!sidebarOpened)}>
      <div className="">
        <img
          src={
            user?.image
              ? user?.image
              : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
          }
          width={40}
          height={40}
          className="rounded-full"
          alt="User Image"
        />
      </div>
      <Link href={'/organization'} className="text-base font-semibold">{user?.fName} {user?.lName}</Link>
    </div>
  );
};

export default User;
