import useApp from "@/context/useApp";
import { CoachObj } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
type props = {
  onChange: (value: string) => void;
  label?: boolean;
  id?: any;
};
const CoachSelect = ({ onChange, label = true, id }: props) => {
  const [loading, setLoading] = useState(true);
  const { setToaster, organization } = useApp();
  const [coaches, setCoaches] = useState<CoachObj[] | null>(null);
  const [coach, setCoach] = useState<string>("");
  const getCoaches = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/team/coaches`);
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setCoaches(data);
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
    getCoaches();
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
  //console.log(coaches)
  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-12" />
      ) : (
        <div className="field">
          {label && (
            <label htmlFor="Select Team Role" className="input--label">
              Assign Coach
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
          <option value="" disabled>Select a group</option>
            {coaches?.map((coach) => {
              return (
                <option value={coach?.id} key={coach?.id}>
                  {coach?.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default CoachSelect;
