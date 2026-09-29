"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useApp from "@/context/useApp";
import { useEditor } from "@/context/EditorProvider";

type Props = {
  menu: {
    id: number;
    title: string;
    url: string;
    icon: React.JSX.Element | null;
    isDropdown: boolean;
    links: {
      title: string;
      url: string;
      id: number;
    }[];
  };
};

function EditorMenuItem({ menu }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { sidebarOpened, openSidebar } = useApp();

  const handleSetOpen = () => setOpen(!open);

  useEffect(() => {
    if (menu?.links && menu?.links.length > 0) {
      const checkMain = () => {
        return menu?.links.some((link) => pathname === link.url);
      };
      setOpen(checkMain());
    }
  }, []);

  return (
    <li className="" key={menu?.id}>
      {menu.isDropdown ? (
        <button
          onClick={handleSetOpen}
          className={`w-full flex gap-3 sideBarItem overflow-hidden items-center justify-start ${
            open ? "sideBarActive" : ""
          } `}
        >
          {menu.icon}
          <p className={`sideBarTitle`}>{menu.title}</p>
        </button>
      ) : (
        <Link
          href={menu.url ? menu.url : '/'}
          className={`flex gap-3 sideBarItem overflow-hidden items-center justify-start ${
            pathname === `${menu.url}` ? "sideBarActive" : ""
          } `}
          onClick={() => openSidebar(!sidebarOpened)}
        >
          {menu.icon}
          <p className={`sideBarTitle`}>{menu.title}</p>
        </Link>
      )}
      { menu.isDropdown && (
        <div className={`submenu ${open ? "submenu-open ms-3 mt-2" : ""}`}>
          <ul className="flex flex-col gap-3">
            {menu?.links.length > 0 &&
              menu?.links?.map((link) => {
                return (
                  <li className="block" key={link?.id}>
                    <Link
                      href={link.url ? link.url : '/'}
                      className={`block py-1.5 px-2 rounded text-sm  ${
                        pathname == link.url && "border"
                      } `}
                      onClick={() => openSidebar(!sidebarOpened)}
                    >
                      {" - " + link?.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </li>
  );
}

export default EditorMenuItem;
