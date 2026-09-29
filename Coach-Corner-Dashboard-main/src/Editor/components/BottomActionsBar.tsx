import React, { useState } from "react";
import TextIcon from "@/components/icons/editor/TextIcon";
import PlayerIcon from "@/components/icons/editor/PlayerIcon";
import LineIcon from "@/components/icons/editor/LineIcon";
import SymbolIcon from "@/components/icons/editor/SymbolIcon";
import NotesIcon from "@/components/icons/editor/NotesIcon";
import VideoIcon from "@/components/icons/editor/VideoIcon";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/EditorSelect";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import IconChevronRight from "@/components/icons/IconChevronRight";
import PlayerActions from "./PlayerActions";
import PlayerSizeShape from "./PlayerSizeShape";
import TextShadeStyle from "./TextShadeStyle";
import OutlineStyle from "./OutlineStyle";
import FillStoreColor from "./FillStoreColor";
import CloseIcon from "@/components/icons/CloseIcon";
import ThicknessStyle from "./ThicknessStyle";
import LineColorEndPoint from "./LineColorEndPoint";
import TextBlockActions from "./TextBlockActions";
import TextBlockInput from "./TextBlockInput";
import TextFormatSize from "./TextFormatSize";
import TextBlockColor from "./TextBlockColor";
import SymbolActionBlock from "./SymbolActionBlock";
import NotesBlock from "./NotesBlock";
import VideoListBlock from "./VideoListBlock";
import AddVideoBlock from "./AddVideoBlock";

type selectedAction = "player" | "line" | "text" | "symbol" | "notes" | "video";
type ActionBtn = {
  id: number;
  name: string;
  value: selectedAction;
  icon: React.JSX.Element;
};
const actionButtons: ActionBtn[] = [
  {
    id: 1,
    name: "Player",
    value: "player",
    icon: <PlayerIcon />,
  },
  {
    id: 2,
    name: "Line",
    value: "line",
    icon: <LineIcon />,
  },
  {
    id: 3,
    name: "Text",
    value: "text",
    icon: <TextIcon />,
  },
  {
    id: 4,
    name: "Symbol",
    value: "symbol",
    icon: <SymbolIcon />,
  },
  {
    id: 5,
    name: "Notes",
    value: "notes",
    icon: <NotesIcon />,
  },
  {
    id: 6,
    name: "Video",
    value: "video",
    icon: <VideoIcon />,
  },
];

const BottomActionsBar = () => {
  const [selectedAction, setSelectedAction] = useState<ActionBtn>(
    actionButtons[0]
  );
  const [open, setOpen] = useState(false);
  const handleObjectChange = (value: ActionBtn) => {
    setSelectedAction(value);
    setOpen(!open);
  };
  return (
    <>
      <div className="editor-bottom-bar w-full bg-tertiary p-3">
        <div className="flex items-center justify-center md:justify-between md:px-4">
          <div className="bottom-bar-actions flex justify-start gap-2">
            {actionButtons?.map((button: ActionBtn) => {
              return (
                <button
                  key={button?.id}
                  type="button"
                  className={`bottom-bar-btn flex flex-col items-center gap-2 justify-center cursor-pointer border border-primary rounded ${
                    selectedAction?.value == button.value
                      ? "bg-primary text-white"
                      : "bg-transparent text-primary"
                  }`}
                  data-selected={selectedAction?.value === button?.value}
                  onClick={(e) => handleObjectChange(button)}
                >
                  {button?.icon}
                  <span className="font-semibold">{button?.name}</span>
                </button>
              );
            })}
          </div>
          <div className="second-part hidden md:flex items-center justify-center w-full basis-5/12 gap-3 border-l border-[#B7C9DB] ">
            <div className="h-full w-full mt-6 ps-3 block">
              <div className="bg-themeSoftBg flex items-center gap-1 p-2 justify-between rounded">
                <label
                  htmlFor="line-scrimmage"
                  className="p-0 m-0 cursor-pointer text-base text-primary"
                >
                  Line of Scrimmage
                </label>
                <Switch id="line-scrimmage" className="m-0" />
              </div>
            </div>
            <div className="block w-full px-3 type-player">
              <span className="mb-2 text-gray-700 text-sm">Type of play</span>
              <div className="editor-secondary-header-field-background-select">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer open={open} onOpenChange={(value) => setOpen(value)}>
        <DrawerContent className="">
          <div className="absolute -top-10 left-5 vaul-sticky-close px-3 pt-1">
            <DrawerClose className="px-5 pt-2 pb-1 flex items-center justify-center gap-2">
              <div className="flex items-center justify-start gap-2">
                {selectedAction?.icon}
                <span className="capitalize">{selectedAction?.name}</span>
              </div>
              <IconChevronRight classes={"rotate-90"} />
              <CloseIcon />
            </DrawerClose>
          </div>
          <DrawerHeader>
            <div className="drawer-content flex items-start flex-wrap xl:flex-nowrap justify-start w-full">
              {selectedAction?.value == "player" && (
                <>
                  <PlayerActions />
                  <PlayerSizeShape />
                  <TextShadeStyle />
                  <OutlineStyle />
                  <FillStoreColor />
                </>
              )}
              {selectedAction?.value == "line" && (
                <>
                  <PlayerActions />
                  <ThicknessStyle />
                  <LineColorEndPoint />
                </>
              )}
              {selectedAction?.value == "text" && (
                <>
                  <TextBlockActions />
                  <TextBlockInput />
                  <TextFormatSize />
                  <TextBlockColor />
                </>
              )}
              {selectedAction?.value == "symbol" && (
                <>
                  <SymbolActionBlock />
                </>
              )}
              {selectedAction?.value == "notes" && (
                <>
                  <NotesBlock />
                </>
              )}
              {selectedAction?.value == "video" && (
                <>
                  <VideoListBlock />
                  <AddVideoBlock />
                </>
              )}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BottomActionsBar;
