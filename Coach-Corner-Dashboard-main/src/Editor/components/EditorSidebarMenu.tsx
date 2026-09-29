import React from "react";
import EditorMenuItem from "./EditorMenuItem";
import TeamIcon from "@/components/icons/TeamIcon";
import CreatePlayIcon from "@/components/icons/CreatePlayIcon";
import GamePlanIcon from "@/components/icons/GamePlanIcon";
import CommunicationIcon from "@/components/icons/CommunicationIcon";
import MeetingIcon from "@/components/icons/MeetingIcon";
import ReportsIcon from "@/components/icons/ReportsIcon";
import MyFileIcon from "@/components/icons/MyFileIcon";
import MyToolsIcon from "@/components/icons/MyToolsIcon";

type Props = {};

const mainmenu = [
  {
    id: 1,
    title: "Team",
    url: "",
    icon: <TeamIcon />,
    isDropdown: true,
    links: [
      {
        title: "Overview",
        url: "/",
        id: 11,
      },
      {
        title: "Manage Team",
        url: "/team/manage",
        icon: null,
        id: 12,
      },
      {
        title: "Groups",
        url: "/team/groups",
        id: 13,
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
  },
  {
    id: 3,
    title: "Game Plans",
    url: "",
    icon: <GamePlanIcon />,
    isDropdown: true,
    links: [
      {
        title: "My Plays",
        url: "/plays",
        id: 31,
      },
      {
        title: "Plays Library",
        url: "/plays/library",
        id: 32,
      },
      {
        title: "Books",
        url: "/plays/books",
        id: 33,
      },
      {
        title: "Test Play",
        url: "/play/983943/editor",
        id: 34,
      },
    ],
  },
  {
    id: 4,
    title: "Communication",
    url: "",
    icon: <CommunicationIcon />,
    isDropdown: true,
    links: [
      {
        title: "Chats",
        url: "/communication/chats",
        id: 41,
      },
      {
        title: "Notice Board",
        url: "/communication/notice-board",
        id: 42,
      },
      {
        title: "Posts",
        url: "/communication/posts",
        id: 43,
      },
    ],
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
      },
      {
        title: "Player ",
        url: "/meetings/players",
        id: 52,
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
      },
      {
        title: "Player Scouting",
        url: "/reports/players",
        id: 62,
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
      },
      {
        title: "Practice Schedules",
        url: "/tools/schedules",
        id: 82,
      },
    ],
  },
];

function EditorSidebarMenu({}: Props) {
  return (
    <div className="flex items-start justify-center pb-10 w-full">
      <ul className="sideBarItems">
        {mainmenu.map((menu) => {
          return <EditorMenuItem menu={menu} key={menu?.id} />;
        })}
      </ul>
    </div>
  );
}

export default EditorSidebarMenu;
