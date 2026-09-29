"use client";
import React, { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import EmptySection from "@/snippets/EmptySection";
import { useRouter } from "next/navigation";
import { Group } from "@/helpers/types";
import GroupContent from "./GroupContent";
import Link from "next/link";
import PermissionValidator from "@/components/PermissionValidator";
import { hasClaim } from "@/lib/utils";

const GroupsPage = ({ classes }: any) => {
  const [loading, setLoading] = useState(true);
  const { teams, setToaster, organization } = useApp();
  const [error, setError] = useState(false);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [groupCount, setGroupCount] = useState<number>(0);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const router = useRouter();

  const getGroups = async () => {
    try {
      if (!teams) {
        setToaster("error", "Teams not found");
        return;
      }
      setLoading(true);
      const res = await fetchClient(`/api/team/Groups?teamId=${teams[0]?.id}`);
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
    if (!teams) {
      console.log(
        "trigger the redirect form the useEffect on the overview page."
      );
      router.push("/organizations");
    } else {
      getGroups();
    }
  }, []);
  console.log("group", groups);
  return (
    <PermissionValidator value="Permission.Groups.View">
      <TopBar title="Groups" back={false}>
        {hasClaim(organization?.claims, "Permission.Groups.Create") ? (
          <Link href={"/team/groups/add"} className="btn btn--tertiary">
            Create New Group
          </Link>
        ) : (
          <></>
        )}
      </TopBar>
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          {groups && groups?.length > 0 ? (
            <GroupContent groups={groups} />
          ) : (
            <div className="py-8 px-4">
              <EmptySection
                title="No Groups Yet"
                content="You haven’t created or joined any groups yet. Start by creating a new group or invite others to join your existing groups to foster collaboration and teamwork."
                btnTitle="Create Group"
                link="/team/groups/add"
              />
            </div>
          )}
        </>
      )}
    </PermissionValidator>
  );
};

export default GroupsPage;
