"use client";
import SectionLoader from "@/components/loaders/SectionLoader";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PracticeCard from "./PracticeCard";
import { PracticeSchedule } from "@/helpers/types";

const PracticePage = () => {
  const { setToaster, selectedTeam } = useApp();
  const [loading, setLoading] = useState(false);
  const [practices, setPractices] = useState<PracticeSchedule[] | null>(null);

  const getPractices = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/PracticeSchedules/${selectedTeam?.id}/schedules?pageNo=1&pageSize=10`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setPractices(data?.items);
      } else {
        setToaster("error", res?.message[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPractices();
  }, []);

  // console.log("prartices for the practice page", practices);
  return (
    <>
      <div>
        <TopBar title="Practice Schedules" back={false}>
          <Link
            href={"/practice-schedules/create"}
            className="btn btn--primary"
          >
            Add Practice Schedule
          </Link>
        </TopBar>
        <div className="px-4 py-12">
          {loading ? (
            <SectionLoader />
          ) : (
            <>
              <div className="flex justify-start gap-2  flex-wrap">
                {practices &&
                  practices?.map((practice: any, index: number) => (
                    <PracticeCard key={index} practice={practice} />
                  ))}
              </div>
              {/* <pre>{JSON.stringify(practices, undefined, 2)}</pre> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PracticePage;
