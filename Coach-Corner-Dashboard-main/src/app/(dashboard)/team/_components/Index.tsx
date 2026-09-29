"use client";
import React, { Suspense, useEffect, useState } from "react";
import GroupsContent from "./GroupsContent";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import EmptySection from "@/snippets/EmptySection";
import { useRouter } from "next/navigation";
import { Group } from "@/helpers/types";
import FansSvg from "@/components/icons/FansSvg";
import PermissionValidator from "@/components/PermissionValidator";

const OverviewPage = () => {
  const [loading, setLoading] = useState(true);
  const { selectedTeam, teams, setToaster } = useApp();
  const [error, setError] = useState(false);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [groupCount, setGroupCount] = useState<number>(0);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const router = useRouter();

  const getGroups = async () => {
    try {
      if (!selectedTeam) {
        setToaster("error", "Teams not found");
        return;
      }
      setLoading(true);
      const res = await fetchClient(
        `/api/team/Groups?teamId=${selectedTeam?.id}`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setGroups(data?.groups);
        setGroupCount(data?.totalGroups);
        setTotalMembers(data?.totalMembers);
        setLoading(false);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedTeam) {
      console.log(
        "trigger the redirect form the useEffect on the overview page."
      );
      router.push("/organizations");
    } else {
      getGroups();
    }
  }, []);
  // console.log("group inside", groups);
  return (
    <Suspense fallback={<SectionLoader />}>
      <PermissionValidator value="Permission.Teams.View">
        <TopBar title="Overview" back={false}>
          <div className="flex flex-wrap justify-end sm:gap-0 gap-x-2 ">
            <div className="sm:text-base text-sm font-normal border-r border-black border-opacity-10 sm:pr-8">
              <span className="pr-1 hidden sm:inline"> Total members:</span>
              <span className="text-themePrimary font-bold md:opr-0 pr-1">
                {totalMembers}
              </span>
            </div>
            <div className="sm:text-base text-sm font-normal md:pl-8 pl:0">
              <span className="pr-1 hidden sm:inline"> Number of groups:</span>
              <span className="text-themePrimary font-bold">{groupCount}</span>
            </div>
          </div>
        </TopBar>
        {loading ? (
          <SectionLoader />
        ) : (
          <>
            {groups && groups?.length > 0 ? (
              <GroupsContent groups={groups} />
            ) : (
              <div className="py-8 px-4">
                <EmptySection
                  title="Invite Your Team Members"
                  content={`Your team is ready! Now, invite coaches and players to join and start collaborating effectively on The Coach Corner.`}
                  btnTitle="Invite Members"
                  icon={<FansSvg />}
                  link="/team/manage/add"
                />
              </div>
            )}
          </>
        )}
      </PermissionValidator>
    </Suspense>
  );
};

export default OverviewPage;
