"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useApp from "@/context/useApp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarMenuItem } from "@/helpers/types";
import { hasClaim } from "@/lib/utils";

type Props = {
  menu: SidebarMenuItem;
};

function MenuItem({ menu }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { sidebarOpened, openSidebar,organization } = useApp();
  const handleSetOpen = () => setOpen(!open);

  useEffect(() => {
    if (menu?.links && menu?.links.length > 0) {
      const checkMain = () => {
        if(menu?.links){
          return menu?.links.some((link) => pathname === link.url);
        }else{
          return false;
        }
      };
      setOpen(checkMain());
    }
    if (pathname) {
      const newArr = pathname.split("/");
      //console.log(newArr)
      if (newArr?.includes(menu?.title.toLowerCase())) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
    if (pathname === "/") {
      if (menu.title.toLowerCase() === "team") {
        setOpen(true);
      }
    }
  }, []);
  useEffect(() => {
    if (pathname) {
      const newArr = pathname.split("/");
      //console.log(newArr);
      if (menu?.type) {
        if (newArr?.includes(menu?.type.toLowerCase())) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }
    }
    // if (pathname === "/") {
    //   if (menu.title.toLowerCase() === "team") {
    //     setOpen(true);
    //   }
    // }
  }, [pathname]);
   if(menu?.claim && !hasClaim(organization?.claims, menu?.claim)){
    return <span className="sr-only">{menu?.title} is not available</span>;
   }
  //console.log(pathname,open,menu.title);
  return (
    <>
      <li className="">
        {menu.isDropdown ? (
          <Accordion
            type="single"
            value={open ? "item-1" : ""}
            onValueChange={(value) => {
              setOpen(value === "item-1");
            }}
          >
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger
                className={`flex w-full items-center justify-start gap-2 sideBarItem ${
                  open ? "sideBarActive" : ""
                } [&[data-state=open]>svg]:rotate-0 hover:no-underline`}
                onClick={() => handleSetOpen()}
              >
                {menu.icon}
                <p className="sideBarTitle no-underline">{menu.title}</p>
              </AccordionTrigger>
              <AccordionContent>
                {menu.isDropdown && (
                  <ul className="flex flex-col gap-3 ms-3 mt-2">
                    {menu?.links && menu?.links.length > 0 &&
                      menu?.links?.map((link) => {
                        if(link?.claim && !hasClaim(organization?.claims, link?.claim)){
                          return <span className="sr-only" key={link?.id}>{link?.title} is not available</span>;
                         }
                        return (
                          <li className="block" key={link?.id}>
                            <Link
                              href={link.url ? link.url : "/"}
                              className={`block py-1.5 px-2 rounded text-sm  ${
                                pathname == link.url && " border "
                              }`}
                              data-menu-item={link?.url}
                              data-menu-name={link?.title}
                              onClick={() => openSidebar(!sidebarOpened)}
                            >
                              <span className="me-2">{" - "}</span>
                              <span>{link?.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            href={menu.url ? menu.url : "/"}
            className={`flex gap-3 sideBarItem ${
              pathname === `${menu.url}` ? "sideBarActive" : ""
            } `}
            onClick={() => openSidebar(!sidebarOpened)}
          >
            {menu.icon}
            <p className="sideBarTitle">{menu.title}</p>
          </Link>
        )}
      </li>
    </>
  );
}

export default MenuItem;
