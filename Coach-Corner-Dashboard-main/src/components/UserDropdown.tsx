import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useApp from "@/context/useApp";
import { IoLogOutOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import Link from "next/link";
import { CiMoneyBill } from "react-icons/ci";
import { returnAddress } from "@/lib/utils";

const UserDropdown = () => {
  const { user, toggleLogout, logoutTrigger, organization, organizations } =
    useApp();
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src={
              organization?.logo
                ? organization?.logo
                : organization?.icon
                ? organization?.icon
                : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
            }
            alt={organization?.name}
            className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-1 min-w-64">
          <DropdownMenuItem asChild>
            <Link
              href={"/organization"}
              className="p-2 flex items-center justify-start gap-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={
                  organization?.logo
                    ? organization?.logo
                    : organization?.icon
                    ? organization?.icon
                    : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
                }
                alt={organization?.name}
                className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-sm"
              />
              <div className="truncate overflow-hidden">
                <p className="text-sm text-gray-800 m-0">
                  {organization?.name}
                </p>
              </div>
            </Link>
          </DropdownMenuItem>
          {/* {organizations &&
            organizations.length > 1 &&
            organizations?.map((organization) => {
              return (
                <DropdownMenuItem asChild key={organization?.id}>
                  <Link
                    href={"/organization"}
                    className="p-2 flex items-center justify-start gap-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={
                        organization?.image
                          ? organization?.image
                          : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
                      }
                      alt={organization?.name}
                      className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-sm"
                    />
                    <div className="truncate overflow-hidden">
                      <p className="text-sm text-gray-800 m-0">
                        {organization?.name} <br />
                        {organization?.address && (
                          <span className="text-xs text-gray-500 truncate max-w-52 overflow-hidden inline-block">
                            {returnAddress(organization?.address)}
                          </span>
                        )}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              );
            })} */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Help Center</DropdownMenuItem>
          <DropdownMenuItem>Customer Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="p-2 flex items-center justify-start gap-2">
            <img
              src={
                user?.image
                  ? user?.image
                  : "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
              }
              alt={user?.fName}
              className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full"
            />
            <div className="truncate overflow-hidden">
              <p className="text-sm text-gray-800 m-0">
                {user?.fName} {user?.lName}
              </p>
              <p className="text-xs text-gray-700 m-0 truncate">
                {" "}
                {user?.email}
              </p>
            </div>
          </div>
          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="w-full flex items-center justify-start gap-2 cursor-pointer"
            >
              <LuUser className="w-4 h-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/plan"
              className="w-full flex items-center justify-start gap-2 cursor-pointer"
            >
              <CiMoneyBill className="w-4 h-4" />
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="" asChild>
            <button
              type="button"
              onClick={() => toggleLogout(!logoutTrigger)}
              className="flex items-center justify-start gap-2 border-0 bg-transparent shadow-none outline-none w-full cursor-pointer"
            >
              <IoLogOutOutline />
              <span className="inline-block w-full text-left">Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
