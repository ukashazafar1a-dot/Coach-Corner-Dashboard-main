"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BsCameraVideo } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TfiExchangeVertical } from "react-icons/tfi";
import { PiNoteLight } from "react-icons/pi";
import { TbDotsVertical } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiEdit } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { PiPrinter } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import useApp from "@/context/useApp";
import { hasClaim } from "@/lib/utils";

const PlayCard = ({ play }: any) => {
  const [open, setOpen] = useState(true);
  const { organization } = useApp();
  return (
    <Card className="p-0 max-w-96 rounded shadow-none relative">
      <Link href={"/plays/1"}>
        <Image
          src={
            "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1732010659/cc-site-assets/placeholder-image_dlsbhg.png"
          }
          width={600}
          height={300}
          alt="Play Image"
        />
      </Link>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-1 rounded bg-primary absolute top-2 right-2"
      >
        <TfiExchangeVertical
          className={`w-5 h-5 fill-white transition-all duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <CardHeader className="p-3 gap-0">
        <div className="flex items-center justify-between">
          <Link href={"/plays/1"}>
            <CardTitle className="mb-0">{play?.name}</CardTitle>
          </Link>
          <div className="flex items-center justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BsCameraVideo className="w-5 h-5 fill-primary" />
                </TooltipTrigger>
                <TooltipContent className="text-white">
                  This play includes videos
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PiNoteLight className="w-5 h-5 fill-primary" />
                </TooltipTrigger>
                <TooltipContent className="text-white">
                  This play includes notes
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 rounded-full bg-gray-100">
                <TbDotsVertical className="w-5 h-5 fill-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {hasClaim(
                  organization?.claims,
                  "Permission.PlayBooks.Edit"
                ) && (
                  <>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <AiOutlinePlus className="w-4 h-4 fill-primary" />
                      <span>Add Play to Playbook</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
                  <Link href={"/plays/1"}>
                    <PiNoteLight className="w-4 h-4 fill-primary" />
                    <span>View Play</span>
                  </Link>
                </DropdownMenuItem>
                {hasClaim(organization?.claims, "Permission.Plays.Edit") && (
                  <>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <CiEdit className="w-4 h-4 fill-primary" />
                      <span>Edit Play</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <GoCopy className="w-4 h-4 fill-primary" />
                      <span>Duplicate Play</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <AiOutlineMail className="w-4 h-4 fill-primary" />
                  <span>Send Play in Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <PiPrinter className="w-4 h-4 fill-primary" />
                  <span>Print Play</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <MdDownload className="w-4 h-4 fill-primary" />
                  <span>Download Play</span>
                </DropdownMenuItem>
                {hasClaim(organization?.claims, "Permission.Plays.Delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <MdDeleteOutline className="w-4 h-4 fill-red-500" />
                      <span className="text-red-500">Delete Play</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Link href={"/plays/1"}>
          <CardDescription>A short description for the play.</CardDescription>
        </Link>
      </CardHeader>
    </Card>
  );
};

export default PlayCard;
