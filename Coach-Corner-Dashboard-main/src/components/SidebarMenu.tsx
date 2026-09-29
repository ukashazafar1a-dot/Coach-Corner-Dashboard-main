import React from "react";
import MenuItem from "./MenuItem";
import TeamIcon from "./icons/TeamIcon";
import CreatePlayIcon from "./icons/CreatePlayIcon";
import CommunicationIcon from "./icons/CommunicationIcon";
import GamePlanIcon from "./icons/GamePlanIcon";
import MeetingIcon from "./icons/MeetingIcon";
import MyFileIcon from "./icons/MyFileIcon";
import MyToolsIcon from "./icons/MyToolsIcon";
import ReportsIcon from "./icons/ReportsIcon";
import { SidebarMenuItem } from "@/helpers/types";
import { GoHomeFill } from "react-icons/go";
import { GoReport } from "react-icons/go";
import ReportAnIssue from "./ReportAnIssue";
import { TbTableFilled } from "react-icons/tb";

const mainmenu: SidebarMenuItem[] = [
  {
    id: 111,
    title: "Home",
    url: "/",
    icon: <GoHomeFill className="icon" />,
    isDropdown: false,
    type: "home",
    links: null,
  },
  {
    id: 1,
    title: "Team",
    url: "",
    icon: <TeamIcon />,
    isDropdown: true,
    type: "team",
    links: [
      {
        title: "Overview",
        url: "/team",
        id: 11,
        claim: "Permission.Teams.View",
      },
      {
        title: "Manage Team",
        url: "/team/manage",
        icon: null,
        id: 12,
        claim: "Permission.Teams.Edit",
      },
      {
        title: "Groups",
        url: "/team/groups",
        id: 13,
        claim: "Permission.Groups.View",
      },
      {
        title: "Pending Approvals",
        url: "/team/pending",
        id: 14,
        claim: "Permission.Teams.Edit",
      },
    ],
  },
  {
    id: 2,
    title: "Create Play",
    url: "/create-play",
    isDropdown: false,
    icon: <CreatePlayIcon />,
    links: [],
    type: "create-play",
    claim: "Permission.Plays.Create",
  },
  {
    id: 3,
    title: "Game Plans",
    url: "",
    icon: <GamePlanIcon />,
    isDropdown: true,
    type: "plays",
    links: [
      {
        title: "My Plays",
        url: "/plays",
        id: 31,
        claim: "Permission.Plays.View",
      },
      {
        title: "Plays Library",
        url: "/plays/library",
        id: 32,
        claim: "Permission.Plays.View",
      },
      {
        title: "Books",
        url: "/plays/books",
        id: 33,
        claim: "Permission.PlayBooks.View",
      },
      {
        title: "Test Play",
        url: "/play/983943/editor",
        id: 34,
        claim: "Permission.Plays.View",
      },
    ],
  },
  {
    id: 4,
    title: "Communication",
    url: "",
    icon: <CommunicationIcon />,
    isDropdown: true,
    type: "communication",
    links: [
      {
        title: "Chats",
        url: "/communication/chats",
        id: 41,
        claim: "Permission.Chats.View",
      },
      {
        title: "Notice Board",
        url: "/communication/notice-board",
        id: 42,
        claim: "Permission.Noticeboards.View",
      },
      {
        title: "Posts",
        url: "/communication/posts",
        id: 43,
        claim: "Permission.Posts.View",
      },
    ],
  },
  {
    id: 9,
    title: "Practice Schedules",
    icon: <TbTableFilled />,
    url: "/practice-schedules",
    isDropdown: false,
    links: null,
  },
  {
    id: 5,
    title: "Meetings",
    icon: <MeetingIcon />,
    url: "",
    isDropdown: true,
    links: [
      {
        title: "Coach ",
        url: "/meetings/coaches",
        id: 51,
        claim: "Permission.Meetings.View",
      },
      {
        title: "Player ",
        url: "/meetings/players",
        id: 52,
        claim: "Permission.Meetings.View",
      },
    ],
  },
  {
    id: 6,
    title: "Reports",
    icon: <ReportsIcon />,
    url: "",
    isDropdown: true,
    links: [
      {
        title: "Game Scouting",
        url: "/reports",
        id: 61,
        claim: "Permission.Reports.View",
      },
      {
        title: "Player Scouting",
        url: "/reports/players",
        id: 62,
        claim: "Permission.Reports.View",
      },
    ],
  },
  {
    id: 7,
    title: "My Files",
    url: "/files",
    icon: <MyFileIcon />,
    isDropdown: false,
    links: [],
    claim: "Permission.Tools.View",
  },
  {
    id: 8,
    title: "My Tools",
    url: "",
    icon: <MyToolsIcon />,
    isDropdown: true,
    links: [
      {
        title: "Templates",
        url: "/tools/templates",
        id: 81,
        claim: "Permission.Tools.View",
      },
      {
        title: "Practice Schedules",
        url: "/tools/schedules",
        id: 82,
        claim: "Permission.Tools.View",
      },
    ],
  },
];

const SidebarMenu = () => {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <ul className="sideBarItems">
        {mainmenu.map((menu) => {
          return <MenuItem menu={menu} key={menu?.id} />;
        })}
        <li>
          <ReportAnIssue />
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
