"use client";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import PlayCard from "./PlayCard";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";

const PlaysPage = () => {
  const { setToaster, selectedTeam } = useApp();
  const [loading, setLoading] = useState(false);
  const [plays, setPlays] = useState<any>(null);

  const getPlays = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Plays/${selectedTeam?.id}?skip=0`);
      console.log(res);
      if(res && res?.succeeded){
        const { data } = res;
        setPlays(data);
      }else{
        setToaster("error", res?.message[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlays();
  }, []);

  return (
    <div>
      <TopBar title="Plays" back={false} />
      <div className="px-4 py-12">
        {loading ? (
          <SectionLoader />
        ) : (
          <div className="flex items-start justify-start gap-2 flex-wrap">
            {plays && plays?.map((play:any) => {
              return <PlayCard key={play?.id} play={play}/>
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaysPage;
