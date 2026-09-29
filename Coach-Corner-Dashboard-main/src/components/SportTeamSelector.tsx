"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApp from "@/context/useApp";

type props = {
  classes?: string;
};

const SportTeamSelector = ({ classes }: props) => {
  const { sports, selectedSport, setSelectedSport, teams, selectedTeam } =
    useApp();
  if (!sports) return <></>;
  return (
    <div className={`relative lg:hidden flex items-center justify-center`}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HiOutlineSwitchVertical className="w-5 h-5 fill-white text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3">
          <p className="text-black opacity-75 text-sm mb-1">Sport</p>
          <Select value={String(selectedSport?.id)}>
            <SelectTrigger className="sport-select-btn text-black gap-2 focus:ring-black">
              <span className="">{selectedSport?.name}</span>
              <HiOutlineSwitchVertical className="w-4 h-4" />
            </SelectTrigger>
            <SelectContent>
              {sports?.map((sport) => (
                <SelectItem value={String(sport?.id)} key={sport.id}>
                  {sport?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {teams && (
            <>
              {" "}
              <p className="text-black opacity-75 text-sm mt-2 mb-1">Team</p>
              <Select value={selectedTeam?.id}>
                <SelectTrigger className="sport-select-btn text-black gap-2 focus:ring-black">
                  <span className="">{selectedTeam?.name}</span>
                  <HiOutlineSwitchVertical className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  {teams?.map((team) => (
                    <SelectItem value={team?.id} key={team.id}>
                      {team?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>{" "}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SportTeamSelector;
