"use client";
import React, { useState } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApp from "@/context/useApp";


const SportSelector = ({ calsses }: any) => {
  const { sports, selectedSport, setSelectedSport } = useApp();
  if (!sports) return <></>;
  return (
    <div className={`items-center gap-2 relative z-40 ${calsses}`}>
      <Select value={String(selectedSport?.id)}>
        <SelectTrigger className="sport-select-btn text-white border-0 shadow-none text-lg gap-2 focus:ring-white">
          <span className="">{selectedSport?.name}</span>
          <HiOutlineSwitchVertical className="w-5 h-5" />
        </SelectTrigger>
        <SelectContent>
          {sports?.map((sport) => (
            <SelectItem value={String(sport?.id)} key={sport.id}>
              {sport?.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SportSelector;
