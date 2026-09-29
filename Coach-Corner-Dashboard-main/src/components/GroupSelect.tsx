import useApp from "@/context/useApp";
import { CoachObj } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
type props = {
  onChange: (value: string) => void;
  label?: boolean;
  id?: string | null | undefined;
  placeholder?: boolean;
  onEmpty?: (value: boolean) => void;
};
const GroupSelect = ({
  onChange,
  label = true,
  id,
  placeholder = true,
  onEmpty,
}: props) => {
  const [loading, setLoading] = useState(true);
  const { setToaster, organization, selectedTeam } = useApp();
  const [coaches, setCoaches] = useState<CoachObj[] | null>(null);
  const [coach, setCoach] = useState<string>("");
  const getGroups = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/team/Groups/Select?teamId=${selectedTeam?.id}`
      );
      console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setCoaches(data);
        if(data && data?.length == 0) {
          if(onEmpty){
            onEmpty(false);
          }
        }
        if (id) {
          const coach = data.find((coach: any) => coach?.id === id);
          if (coach) {
            setCoach(coach?.id);
          }
        }
        setLoading(false);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {
    if (id) {
      if (coaches) {
        const coach = coaches.find((coach) => coach?.id === id);
        if (coach) {
          setCoach(coach?.id);
        }
      }
    }
  }, [id]);

  if (coaches && coaches?.length == 0) {
    return <></>;
  }
  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <>
          {label && (
            <label htmlFor="Select Team Role" className="input--label">
              Select Group{" "}
              <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
          )}
          <select
            name="coach"
            id="Select Team Role"
            value={coach}
            className="input--field select--field"
            onChange={(e) => {
              setCoach(e.target.value);
              onChange(e.target.value);
            }}
          >
            {placeholder && (
              <option value={""} disabled>
                Select group
              </option>
            )}
            {coaches?.map((coach) => {
              return (
                <option value={coach?.id} key={coach?.id}>
                  {coach?.name}
                </option>
              );
            })}
          </select>
        </>
      )}
    </>
  );
};

export default GroupSelect;
