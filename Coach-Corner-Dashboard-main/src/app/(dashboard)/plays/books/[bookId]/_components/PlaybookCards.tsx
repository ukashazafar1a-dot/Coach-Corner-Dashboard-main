"use client";
import React, { useEffect, useState } from "react";
import PlayCard from "../../../_components/PlayCard";
import { useParams } from "next/navigation";
import fetchClient from "@/hooks/fetchClient";
import useApp from "@/context/useApp";
import SectionLoader from "@/components/loaders/SectionLoader";
import { PlayBook } from "@/helpers/types";
import AddPlays from "./AddPlays";
import { hasClaim } from "@/lib/utils";

const PlaybookCards = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { selectedTeam, setToaster, organization } = useApp();
  const [playbook, setPlaybook] = useState<PlayBook | null>(null);

  const getPlays = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/PlayBook/${params?.bookId}/Plays?skip=0`
      );
      if (res && res?.succeeded) {
        setPlaybook(res?.data);
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
    await getPlays();
  };
  useEffect(() => {
    if (params?.bookId) {
      getPlays();
    }
  }, []);
  //console.log(playbook)
  return (
    <>
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <div className="flex items-start justify-between gap-2 mb-4 flex-col sm:flex-row">
            <div className="block">
              <h2 className="text-xl mb-1">{playbook?.name}</h2>
              <p className="text-base text-gray-700 mb-2">
                {playbook?.description}
              </p>
            </div>
            {hasClaim(organization?.claims, "Permission.PlayBooks.Edit") && (
              <AddPlays id={playbook?.id} handleRefetch={handleRefetch} />
            )}
          </div>
          {playbook?.plays && playbook?.plays?.length > 0 ? (
            <div className="flex items-start justify-start gap-2 flex-wrap">
              {playbook?.plays?.map((play: any) => {
                return (
                  <PlayCard
                    key={play?.id}
                    play={play}
                    handleRefetch={handleRefetch}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-40 text-gray-600">
              No plays found
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PlaybookCards;
