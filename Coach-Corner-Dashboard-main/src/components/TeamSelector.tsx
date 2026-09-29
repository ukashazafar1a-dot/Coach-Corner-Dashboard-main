import useApp from "@/context/useApp";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoChevronDown } from "react-icons/go";
import fetchClient from "@/hooks/fetchClient";
import { Skeleton } from "./ui/skeleton";

const TeamSelector = () => {
  const { teams, selectedTeam, selectedSport, setTeams, setSelectedTeam } =
    useApp();
  const [loading, setLoading] = useState(false);

  const getTeams = async () => {
    if (!selectedSport) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/team/select?sportId=${selectedSport?.id}`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setTeams(data);
        setSelectedTeam(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!teams) {
      getTeams();
    }
  }, []);
  useEffect(() => {
    if (!teams) {
      getTeams();
    }
  }, [selectedSport]);
  if (!teams) return <></>;
  return (
    <div className="lg:block hidden">
      {loading ? (
        <Skeleton className="w-24 h-8" />
      ) : (
        <Select value={selectedTeam?.id}>
          <SelectTrigger className="sport-select-btn text-white rounded-full shadow-none gap-2 focus:ring-white ">
            <span className="">{selectedTeam?.name}</span>
            <GoChevronDown className="w-5 h-5" />
          </SelectTrigger>
          <SelectContent>
            {teams?.map((team) => (
              <SelectItem value={team?.id} key={team.id}>
                {team?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default TeamSelector;
