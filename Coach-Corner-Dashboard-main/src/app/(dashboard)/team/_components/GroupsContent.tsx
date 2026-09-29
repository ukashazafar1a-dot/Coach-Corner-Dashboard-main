"use client";
import GroupCard from "@/components/GroupCard";
import FansSvg from "@/components/icons/FansSvg";
import PlayerCard from "@/components/PlayerCard";
import { Group } from "@/helpers/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import EmptySection from "@/snippets/EmptySection";
import React, { useEffect, useState } from "react";

type props = {
  groups: Group[];
};
const GroupsContent = ({ groups }: props) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { queryParam, setQueryParam } = useQueryParams();

  const handleChangeGroup = (value: any) => {
    setSelectedGroup(value);
    setQueryParam("groupId", value?.id);
  };
  useEffect(() => {
    if (queryParam) {
      const id = queryParam?.get("groupId");
      if (id) {
        const group = groups?.find((group) => group?.id === id);
        if (group) {
          setSelectedGroup(group);
        } else {
          setSelectedGroup(groups[0]);
        }
      } else {
        setSelectedGroup(groups[0]);
      }
    } else {
      setSelectedGroup(groups[0]);
    }
  }, [groups]);
  //console.log(groups)
  return (
    <div className="py-9 md:px-12 px-2">
      <div className="flex justify-start gap-2 pb-10 overflow-x-auto w-full">
        {groups?.map((group) => {
          return (
            <GroupCard
              key={group?.id}
              group={group}
              changeGroup={handleChangeGroup}
              active={selectedGroup === group}
            />
          );
        })}
      </div>
      {selectedGroup && selectedGroup?.members?.length > 0 ? (
        <div className="py-4 relative">
          <div className="flex items-start justify-start gap-3 overflow-y-hidden overflow-x-auto">
            {selectedGroup?.members.map((member) => {
              return <PlayerCard player={member} key={member?.memberId} />;
            })}
          </div>
        </div>
      ) : (
        <div className="py-8">
          <EmptySection
            title="Invite Your Group Members"
            content={`Your Group is ready! Now, invite coaches and players to join and start collaborating effectively on The Coach Corner.`}
            btnTitle="Invite Members"
            icon={<FansSvg />}
            link={`/team/groups/${selectedGroup?.id}/invite`}
          />
        </div>
      )}
    </div>
  );
};

export default GroupsContent;
