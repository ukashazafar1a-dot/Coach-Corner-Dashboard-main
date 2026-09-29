import FlagIcon from "@/components/icons/FlagIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import StarIcon from "@/components/icons/StarIcon";
import useApp from "@/context/useApp";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Coachclaim } from "@/helpers/types";
import { hasClaim } from "@/lib/utils";

type menuType = {
  id: number;
  url: string;
  icon: React.ReactNode;
  title: string;
  claim?: Coachclaim;
};

const footerMenu: menuType[] = [
  {
    id: 0,
    url: "/plan",
    icon: <StarIcon />,
    title: "Subscriptions",
    claim: "Permission.Settings.View",
  },
  {
    id: 1,
    url: "/manage",
    icon: <FlagIcon />,
    title: "Organizations",
    claim: "Permission.Settings.View",
  },
  {
    id: 2,
    url: "/settings",
    icon: <SettingsIcon />,
    title: "Settings",
  },
];
type props = {};

const SideBarFooter = ({}: props) => {
  const { toggleLogout, logoutTrigger, sidebarOpened, openSidebar,organization } = useApp();
  return (
    <div className="bg-themeSecondary border-t border-white border-opacity-25 py-4 px-6   z-50 absolute bottom-0 left-0 right-0">
      <div className="flex items-center justify-center ">
        {footerMenu.map((menu) => {
          if(menu?.claim && !hasClaim(organization?.claims, menu?.claim)){
            return <></>;
          }
          return (
            <TooltipProvider key={menu.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={menu.url ? menu.url : "/"}
                    onClick={() => openSidebar(!sidebarOpened)}
                    className="border-r border-white border-opacity-25  pr-6 pl-6 last:border-r-0"
                  >
                    {menu.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="text-white">
                  {menu?.title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              type="button"
              onClick={() => {
                toggleLogout(!logoutTrigger);
                openSidebar(!sidebarOpened);
              }}
              className="border-r border-white border-opacity-25  pr-6 pl-6 last:border-r-0"
            >
              <span className="sr-only">Logout</span>
              <LogoutIcon />
            </TooltipTrigger>
            <TooltipContent className="text-white">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SideBarFooter;
