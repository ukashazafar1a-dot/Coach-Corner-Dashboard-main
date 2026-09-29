"use client";
import React from "react";
import UndoIcon from "@/components/icons/editor/UndoIcon";
import ZoomOut from "@/components/icons/editor/ZoomOut";
import ZoomIn from "@/components/icons/editor/ZoomIn";
import FlipIcon from "@/components/icons/editor/FlipIcon";
import BringToFrontIcon from "@/components/icons/editor/BringToFrontIcon";
import BringToBackIcon from "@/components/icons/editor/BringToBackIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/EditorSelect";
import IconRedo from "@/components/icons/editor/IconRedo";
import { Switch } from "@/components/ui/switch";
import IconChevronRight from "@/components/icons/IconChevronRight";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function SecondaryHeader() {
  return (
    <div className="secondary-header-action bg-gray-100 p-2 flex justify-start relative items-center w-full">
      <div className="flex items-center justify-center gap-2 max-editor:hidden">
        <button
          type="button"
          className="px-2 py-1 text-center hover:bg-blue-100 hover:rounded"
        >
          <UndoIcon classes={"mx-auto"} />
          <span className="text-sm">Undo</span>
        </button>
        <button
          type="button"
          className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
        >
          <IconRedo classes={"mx-auto"} />
          <span className="text-sm">Redo</span>
        </button>
      </div>
      <div className="min-w-48 2xl:min-w-96">
        <span className="mb-1 text-gray-700 text-sm">Field Background</span>
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
      <div className="block zoom-fields basis-full md:basis-auto">
        <span className="mb-1 text-gray-700 text-sm">Zoom</span>
        <div className="flex items-start justify-start gap-1  md:gap-2">
          <button className="">
            <ZoomOut />
          </button>
          <input
            className="input--field w-full max-w-16 text-xs md:text-sm"
            type="text"
            value={"100%"}
          />
          <button>
            <ZoomIn />
          </button>
        </div>
      </div>
      <div className="flex items-start justify-start gap-3 max-editor:hidden">
        <button
          type="button"
          className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
        >
          <FlipIcon width={34} height={34} direction="v" classes={"mx-auto"} />
          <span className="text-sm">Flip V.</span>
        </button>
        <button
          type="button"
          className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
        >
          <FlipIcon width={34} height={34} direction="h" classes={"mx-auto"} />
          <span className="text-sm">Flip H.</span>
        </button>
        <button
          type="button"
          className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
        >
          <BringToFrontIcon />
          <span className="text-sm">Front</span>
        </button>
        <button
          type="button"
          className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
        >
          <BringToBackIcon />
          <span className="text-sm">Back</span>
        </button>
      </div>
      <div className="h-full flex items-center justify-center max-editor:hidden">
        <div className="flex items-center gap-3 p-3">
          <label htmlFor="auto-save" className="p-0 m-0 cursor-pointer">
            Auto Save
          </label>
          <Switch id="auto-save" className="m-0" />
        </div>
      </div>
      <div className="h-full hidden max-editor:flex items-end justify-end">
        <Popover>
          <PopoverTrigger className="py-3">
            <IconChevronRight
              classes={
                "w-4 h-4 rotate-90 fill-primary stroke-primary text-primary"
              }
            />
          </PopoverTrigger>
          <PopoverContent className="p-3 bg-zinc-100 w-52">
            <div className="block w-full">
              <div className="flex items-center gap-3 p-3 justify-between">
                <label htmlFor="auto-save" className="p-0 m-0 cursor-pointer">
                  Auto Save
                </label>
                <Switch id="auto-save" className="m-0" />
              </div>
              <hr className="bg-gray-100 my-1" />
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 text-center hover:bg-blue-100 hover:rounded"
                >
                  <UndoIcon classes={"mx-auto"} />
                  <span className="text-sm">Undo</span>
                </button>
                <button
                  type="button"
                  className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <IconRedo classes={"mx-auto"} />
                  <span className="text-sm">Redo</span>
                </button>
              </div>
              <hr className="bg-gray-100 my-1" />
              <div className="flex items-start justify-center gap-3">
                <button
                  type="button"
                  className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <FlipIcon
                    width={34}
                    height={34}
                    direction="v"
                    classes={"mx-auto"}
                  />
                  <span className="text-sm">Flip V.</span>
                </button>
                <button
                  type="button"
                  className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <FlipIcon
                    width={34}
                    height={34}
                    direction="h"
                    classes={"mx-auto"}
                  />
                  <span className="text-sm">Flip H.</span>
                </button>
              </div>
              <hr className="bg-gray-100 my-1" />
              <div className="flex items-start justify-center gap-3">
                <button
                  type="button"
                  className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <BringToFrontIcon />
                  <span className="text-sm">Front</span>
                </button>
                <button
                  type="button"
                  className="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <BringToBackIcon />
                  <span className="text-sm">Back</span>
                </button>
              </div>
              <hr className="bg-gray-100 my-1" />
              <div className="py-2">
                <div className="bg-themeSoftBg flex items-center gap-1 p-1 justify-between rounded">
                  <label
                    htmlFor="line-scrimmage"
                    className="p-0 m-0 cursor-pointer text-xs text-primary"
                  >
                    Line of Scrimmage
                  </label>
                  <Switch id="line-scrimmage" className="m-0" />
                </div>
              </div>
              <hr className="bg-gray-100 my-1" />
              <div className="block w-full">
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
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default SecondaryHeader;
