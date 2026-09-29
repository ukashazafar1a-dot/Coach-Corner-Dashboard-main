"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Site } from "@/helpers/Site";
import Search from "./Search";
import useApp from "@/context/useApp";
import SearchIcon from "./icons/SearchIcon";
import MenuIcon from "./icons/MenuIcon";
import { CgMenuLeftAlt } from "react-icons/cg";
import TeamSelector from "./TeamSelector";
import SportTeamSelector from "./SportTeamSelector";
import SportSelector from "./SportSelector";
import UserDropdown from "./UserDropdown";
import Notifications from "./Notifications";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { sidebarOpened, openSidebar } = useApp();

  const handleToggleSearch = () => {
    setOpen(!open);
  };
  return (
    <header className="navGradient py-3 md:py-4 px-3 md:px-4 page-width">
      <nav className="flex items-center justify-between gap-3">
        <div className="lg:hidden flex flex-1">
          <button type="button" onClick={() => openSidebar(!sidebarOpened)}>
            <CgMenuLeftAlt className="w-6 h-6 fill-white text-white" />
          </button>
        </div>
        <div className="flex-1 lg:block hidden">
          <Link href="/">
            <Image
              src={Site?.logo}
              alt={Site?.name}
              height={40}
              width={220}
              className="object-cover"
              priority
            />
          </Link>
        </div>
        <div className="flex-1 lg:hidden flex items-center justify-center">
          <Link href="/">
            <Image
              src={Site?.icon}
              alt={Site?.name}
              className="object-cover"
              height={40}
              width={30}
              priority
            />
          </Link>
        </div>
        <Search open={open} handleToggleSearch={handleToggleSearch} />
        <div className="flex flex-1 items-center justify-end xl:gap-5  lg:gap-2  gap-2">
          <div
            className="lg:hidden block cursor-pointer"
            onClick={handleToggleSearch}
          >
            <SearchIcon classes={'w-5 h-5'}/>
          </div>
          <SportTeamSelector />
          <SportSelector calsses="lg:block hidden" />
          <TeamSelector />
          <UserDropdown />
        </div>
      </nav>
    </header>
  );
}
