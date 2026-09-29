"use client";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import { InviteLinkItem } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import DeleteInvite from "./DeleteInvite";
import Link from "next/link";
import CopyLink from "./CopyLink";
import { PlusIcon } from "@radix-ui/react-icons";
import SectionLoader from "@/components/loaders/SectionLoader";

const InvitePage = () => {
  const [loading, setLoading] = useState(false);
  const { setToaster, selectedTeam } = useApp();
  const [links, setLinks] = useState<InviteLinkItem[] | null>(null);

  const getInvitesLinks = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/InviteRequests/${selectedTeam?.id}?pageNo=1&pageSize=10`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setLinks(data?.items);
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
    await getInvitesLinks();
  };
  useEffect(() => {
    getInvitesLinks();
  }, []);
  console.log(links);
  return (
    <div>
      <TopBar title="Invites Links">
        <Link href={"/team/manage/add"} className="btn btn--tertiary">
          <PlusIcon />
          <span className="ps-1">Add New Invite</span>
        </Link>
      </TopBar>
      <div className="py-8 px-4">
        {loading ? (
          <SectionLoader />
        ) : (
          <Table>
            <TableCaption>A list of your recent links.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Limited</TableHead>
                <TableHead>Total Signups</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-nowrap">Expire at</TableHead>
                <TableHead className="text-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links &&
                links?.map((link, index) => {
                  return (
                    <TableRow key={link?.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{link?.type}</TableCell>
                      <TableCell>{link?.role}</TableCell>
                      <TableCell>{link.limited}</TableCell>
                      <TableCell>{link?.totalSignedUp}</TableCell>
                      <TableCell>{link?.status}</TableCell>
                      <TableCell className="text-nowrap">{formatDate(link?.expirationDate)}</TableCell>
                      <TableCell className="text-nowrap">
                        <div className="flex items-center gap-2 justify-center">
                          <CopyLink link={link} />
                          <Link href={`/team/invites/${link?.id}`} className="btn btn--primary">Edit</Link>
                          <DeleteInvite
                            link={link}
                            handleRefetch={handleRefetch}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default InvitePage;
