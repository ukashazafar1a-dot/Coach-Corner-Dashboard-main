"use client";
import React from "react";
import User from "./User";
import SideBarFooter from "@/components/SideBarFooter";
import useApp from "@/context/useApp";
import CloseIcon from "./icons/CloseIcon";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const { sidebarOpened, openSidebar } = useApp();
  return (
    <div
      className={`main-sidebar relative overflow-hidden ${
        sidebarOpened ? "sideBarShow" : "sidebarHide"
      }`}
    >
      <div className="sideBarGradient h-full p-5 overflow-y-auto text-white ">
        <div className="pb-3 flex items-center justify-end text-white lg:hidden ">
          <div onClick={() => openSidebar(!sidebarOpened)}>
            <CloseIcon classes="text-white stroke-white fill-white" />
          </div>
        </div>
        <User />
        <div className="mb-6 border-t border-white border-opacity-25 pt-6 ">
          <SidebarMenu />
        </div>
      </div>
      <SideBarFooter />
    </div>
  );
};

export default Sidebar;
