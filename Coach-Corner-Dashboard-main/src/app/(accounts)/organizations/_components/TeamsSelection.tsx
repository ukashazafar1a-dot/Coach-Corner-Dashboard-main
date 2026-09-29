import IconChevronRight from "@/components/icons/IconChevronRight";
import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import { TeamObj } from "@/helpers/types";
import useCookie from "@/hooks/useCookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { hasClaim } from "@/lib/utils";
type props = {
  onSportChange: (id: any) => void;
  loading: boolean;
  create: () => void;
};
const TeamsSelection = ({ onSportChange, loading, create }: props) => {
  const {
    user,
    teams,
    logout,
    setSelectedTeam,
    sports,
    selectedSport,
    setSelectedSport,
    organization,
    plan,
  } = useApp();
  const { setCookie } = useCookie();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const handleTeamSelect = async (team: TeamObj) => {
    setSelectedTeam(team);
    startTransition(async () => {
      await setCookie({ ...team, expireAt: user?.expireAt }, "teamId");
      //console.log(searchParams?.get("rb"));
      router.push(`${searchParams?.get("rb") ? searchParams?.get("rb") : "/"}`);
      router.refresh();
      //console.log(team);
    });
  };
  const handleSportChange = (id: string) => {
    const sptId = Number(id);
    const sptobj = sports?.find((sport) => sport?.id === sptId);
    if (sptobj) {
      setSelectedSport(sptobj);
      onSportChange(sptobj?.id);
    }
  };
  const canCreateTeam = plan
    ? plan?.features?.some(
        (feature) => feature.type === "Teams" && feature.remainingQouta > 0
      )
    : false;

  //console.log(sports);
  return (
    <div>
      <div className="flex items-center justify-start gap-3 mb-2">
        <span className="text-left text-gray-700 text-lg">Your Teams</span>
        {isPending && (
          <AiOutlineLoading3Quarters className="animate-spin w-5 h-5 fill-primary" />
        )}
      </div>
      <div className="field">
        <label htmlFor="sport" className="input--label">
          Select a sport
        </label>
        <Select
          value={selectedSport ? String(selectedSport?.id) : ""}
          onValueChange={(sport) => handleSportChange(sport)}
        >
          <SelectTrigger className="max-w-52 me-auto w-full">
            <SelectValue placeholder="Select a sport" />
          </SelectTrigger>
          <SelectContent>
            {sports?.map((sport) => (
              <SelectItem key={sport.id} value={String(sport?.id)}>
                {sport.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <>
          <Skeleton className="h-16 w-full mb-4" />
        </>
      ) : (
        <>
          {teams && teams?.length > 0 ? (
            <div className="flex items-center justify-center gap-2 flex-col mb-4">
              {teams?.map((team) => {
                return (
                  <button
                    type="button"
                    key={team?.id}
                    className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary hover:ring-primary sm:text-sm sm:leading-6"
                    onClick={() => handleTeamSelect(team)}
                  >
                    <div className="flex items-center justify-start">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={team?.image ? team?.image : Site?.placeholder}
                        alt={team?.name}
                      />
                      <div className="ml-3 block truncate text-black text-left">
                        <p className="m-0 text-left">{team?.name}</p>
                      </div>
                    </div>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <IconChevronRight classes={"w-4 h-4 fill-gray-700"} />
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-6 px-4 rounded mb-3">
              <p>No Team Found!</p>
            </div>
          )}{" "}
        </>
      )}
      {canCreateTeam &&
      hasClaim(organization?.claims, "Permission.Teams.Create") ? (
        <div className="field">
          <button
            type="button"
            className="btn btn--primary btn--full py-3"
            onClick={() => create()}
          >
            + Create new team
          </button>
        </div>
      ) : (
        <></>
      )}
      {user && (
        <div className="block">
          <p className="m-0 text-base">
            Logged in as {user?.fName} {user?.lName}.{" "}
            <button
              type="button"
              className="text-primary font-medium"
              onClick={() => logout()}
            >
              Log Out
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamsSelection;
