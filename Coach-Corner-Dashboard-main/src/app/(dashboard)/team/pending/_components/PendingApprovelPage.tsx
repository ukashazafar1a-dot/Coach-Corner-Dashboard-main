"use client";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import React, { useEffect, useState } from "react";
import PendingTable from "./PendingTable";
import { PendingInviteItem } from "@/helpers/types";
import SectionLoader from "@/components/loaders/SectionLoader";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

const PendingApprovelPage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedTeam, setToaster } = useApp();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<PendingInviteItem[] | null>(null);

  const getAppReq = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/${selectedTeam?.id}/Approvals?page=${page}&pageSize=${pageSize}`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setData(data?.items);
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
    await getAppReq();
  };
  useEffect(() => {
    getAppReq();
  }, []);
  return (
    <>
      <TopBar title="Pending Approvals">
        <Link href={"/team/manage/add"} className="btn btn--tertiary">
          <PlusIcon />
          <span className="ps-1">Invite Members</span>
        </Link>
      </TopBar>
      {loading ? (
        <SectionLoader />
      ) : (
        data && <PendingTable requests={data} handleRefetch={handleRefetch} />
      )}
    </>
  );
};

export default PendingApprovelPage;
