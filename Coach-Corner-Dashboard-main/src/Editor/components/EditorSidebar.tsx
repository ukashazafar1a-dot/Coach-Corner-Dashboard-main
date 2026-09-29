"use client";
import React, { useEffect } from "react";
import useApp from "@/context/useApp";
import EditorSidebarMenu from "./EditorSidebarMenu";
import CloseIcon from "@/components/icons/CloseIcon";
import { useEditor } from "@/context/EditorProvider";
import User from "@/components/User";

const EditorSidebar = () => {
  const { sidebarOpened, openSidebar } = useApp();
  const { toggleMenu, toggleSidebar } = useEditor();

  useEffect(() => {
    setTimeout(() => {
      const editor: any = document.querySelector("body");
      const child = document.querySelector(".main-sidebar--editor");
      if (child && editor) {
        editor.style.setProperty("--sidebar-width", child.clientWidth + "px");
      }
    }, 600);
  }, [toggleMenu]);

  return (
    <div
      className={`main-sidebar--editor relative overflow-hidden ${
        sidebarOpened ? "sideBarShow" : "sidebarHide"
      }`}
    >
      <div
        className={`sideBarGradient h-full overflow-y-auto text-white flex flex-col justify-between items-center ${
          toggleMenu ? "toggle-sidebar" : "untoggle"
        }`}
      >
        <div className="block w-full">
          <div className="pb-3 flex items-center justify-end text-white lg:hidden px-4 py-6">
            <div onClick={() => openSidebar(!sidebarOpened)}>
              <CloseIcon classes="text-white stroke-white fill-white" />
            </div>
          </div>
          <div className="px-4 py-6">
            <User />
          </div>
          <hr className="bg-gray-100" />
          <div className="my-3 pt-3 px-4 py-6">
            <EditorSidebarMenu />
          </div>
        </div>
        <div className="p-4 items-center justify-center mb-3 cursor-pointer bottom--toggle">
          <button
            className="hover:bg-white p-3 hover:rounded group"
            type="button"
            onClick={() => toggleSidebar(!toggleMenu)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`group-hover:fill-primary group-hover:stroke-primary group-hover:text-primary w-5 h-5 transition-all ease-linear duration-200 ${
                toggleMenu ? "rotate-0" : "rotate-180"
              }`}
            >
              <path
                d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
