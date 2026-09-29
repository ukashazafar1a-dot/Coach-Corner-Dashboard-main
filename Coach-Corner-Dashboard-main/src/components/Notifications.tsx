"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import NotificationIcon from "./icons/NotificationIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];
const Notifications = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center">
          <NotificationIcon />
          <span className="h-5 w-5 rounded-full flex items-center justify-center absolute -top-2 -end-2 text-themeSecondary font-extrabold z-0  bg-themeSoftBg text-[7px] ">
            99+
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="px-4 py-4">
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/"
              className="flex items-center justify-center py-4 text-themePrimary font-semibold underline underline-offset-2 pb-4 text-sm "
            >
              View All
            </Link>
          </div>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
