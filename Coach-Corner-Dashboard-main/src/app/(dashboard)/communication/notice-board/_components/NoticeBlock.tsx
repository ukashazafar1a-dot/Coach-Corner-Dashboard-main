"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import NoticeCard from "./NoticeCard";
import NoticeDetails from "./NoticeDetails";
import { hasClaim, isDeviceMobile } from "@/lib/utils";
import fetchClient from "@/hooks/fetchClient";
import useApp from "@/context/useApp";
import { NoticeItem } from "@/helpers/types";
import SectionLoader from "@/components/loaders/SectionLoader";
import EmptyNotice from "./EmptyNotice";
import CreateNotice from "./CreateNotice";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import PlusIcon from "@/components/icons/PlusIcon";
import PermissionValidator from "@/components/PermissionValidator";

const NoticeBlock = () => {
  const { selectedTeam, setToaster, organization } = useApp();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notices, setNotices] = useState<NoticeItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<NoticeItem | null>(null);

  const handleSelected = (notices: NoticeItem) => {
    setSelected(notices);
    if (isDeviceMobile()) {
      setOpen(!open);
    }
  };

  const getNotices = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Notice/${selectedTeam?.id}?pageNo=1&pageSize=10`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setNotices(data?.items);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefetch = async () => {
    setSelected(null);
    await getNotices();
  };
  useEffect(() => {
    if (isDeviceMobile()) {
      setOpen(true);
    }
    getNotices();
  }, []);
  //console.log(notices)
  return (
    <PermissionValidator value="Permission.Noticeboards.View">
      <TopBar title="Notice Board">
        {hasClaim(organization?.claims, "Permission.Noticeboards.Create") ? (
          <Link
            href={"/communication/notice-board/create"}
            className="btn btn--tertiary"
          >
            <PlusIcon />
            <span>Add Notice</span>
          </Link>
        ) : (
          <></>
        )}
      </TopBar>
      <div className="px-3 py-5">
        {loading ? (
          <SectionLoader />
        ) : (
          <>
            {notices && notices?.length > 0 ? (
              <div className="border border-primary rounded-chat flex justify-center  overflow-hidden relative notice-board">
                <div
                  className={`user--list basis-3/12 w-full bg-chat-userbg p-3 h-full overflow-x-hidden overflow-y-auto absolute top-0 left-0 lg:block lg:static ${
                    open ? "active-now" : ""
                  }`}
                >
                  <div className="flex items-center justify-center border-b py-2 mb-2 sticky top-0">
                    <input
                      type="text"
                      className="border-none focus:ring-0 p-0 bg-transparent"
                    />
                    <CiSearch className="w-5 h-5" />
                  </div>
                  <div className="block">
                    <p className="text-gray-500 py-2">Today</p>
                    {notices?.map((notice, index) => {
                      return (
                        <NoticeCard
                          notice={notice}
                          key={index}
                          onSelect={handleSelected}
                          active={selected?.id === notice.id}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="user--chat basis-full flex justify-between flex-col h-full lg:basis-9/12 overflow-x-hidden overflow-y-auto ">
                  {selected ? (
                    <NoticeDetails
                      notice={selected}
                      onBack={() => setOpen(!open)}
                      handleRefetch={handleRefetch}
                    />
                  ) : (
                    <EmptyNotice />
                  )}
                </div>
              </div>
            ) : (
              <CreateNotice />
            )}
          </>
        )}
      </div>
    </PermissionValidator>
  );
};

export default NoticeBlock;
