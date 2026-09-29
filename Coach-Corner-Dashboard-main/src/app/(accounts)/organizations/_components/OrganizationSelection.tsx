"use client";
import IconChevronRight from "@/components/icons/IconChevronRight";
import { Skeleton } from "@/components/ui/skeleton";
import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import fetchClient from "@/hooks/fetchClient";
import useCookie from "@/hooks/useCookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import CreateTeam from "./CreateTeam";
import { fetchCookie, hasClaim, returnAddress } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { OrganizationItem } from "@/helpers/types";
import TeamsSelection from "./TeamsSelection";
type steps = "organization" | "teams" | "create" | "error";
const OrganizationSelection = () => {
  const [loading, setLoading] = useState(true);
  const [orgs, setOrgs] = useState<OrganizationItem[] | null>(null);
  const {
    setToaster,
    user,
    organization,
    setOrganization,
    sports,
    setTeams,
    teams,
    setSelectedTeam,
    logout,
    getActivePlan,
    setOrgs: setOrganizations,
  } = useApp();
  const [selected, setSelected] = useState<OrganizationItem | null>(null);
  const [sloading, setSloading] = useState(false);
  const { setCookie } = useCookie();
  const [create, setCreate] = useState(false);
  const [message, setMessage] = useState<string>("Fetching Organizations...");
  const [orgError, setOrgError] = useState(false);
  const [teamError, setTeamError] = useState(false);
  const [getTeam, setGetTeam] = useState(false);
  const [steps, setSteps] = useState<steps>("organization");
  const router = useRouter();
  const [tload, setTload] = useState(false);

  const getTeams = async (sportId: number) => {
    //console.log(sports);
    if (!sportId) {
      setToaster("error", "Please select a sport first");
      setSloading(true);
      return;
    }
    try {
      setTload(true);
      const res = await fetchClient(`/api/team/select?sportId=${sportId}`);
      if (res && res?.succeeded) {
        const { data } = res;
        setTeams(data);
        setSteps("teams");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTload(false);
      setSloading(false);
    }
  };
  const handleRefetchTeam = async () => {
    if (selected && sports && sports.length > 0) {
      await getTeams(sports[0]?.id);
    }
  };
  const handleOrgSelect = async (org: OrganizationItem) => {
    setSelected(org);
    try {
      setSloading(true);
      await setCookie({ id: org?.id, expireAt: user?.expireAt }, "orgId");
      setMessage("Fetcting organization claims for organization....");
      const response = await fetchClient(`/api/organization/claims`, {
        method: "GET",
        headers: {
          OrgId: org?.id,
        },
      });
      //console.log(response);
      if (response && response?.succeeded) {
        const { data } = response;
        setOrganization(data);
        //console.log('here are the organization check',data);
        
        if (data && data?.teamCount > 0) {
          if (sports && sports.length > 0) {
            setSloading(true);
            setMessage("Fetching Teams for first available sport...");
            await getTeams(sports[0]?.id);
            setGetTeam(false);
          } else {
            setGetTeam(true);
          }
        } else {
          if(hasClaim(data?.claims, "Permission.Teams.Create")) {
            await getActivePlan();
            setSteps("create");
            setSloading(false);
          }
        }
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong");
        setSloading(false);
        setGetTeam(false);
      }
    } catch (error) {
      console.log(error);
      setSloading(false);
    }
  };

  const getOrgs = async () => {
    try {
      const response = await fetchClient(`/api/organization/select`);
      //console.log(response);
      if (response && response?.succeeded) {
        const { data } = response;
        setOrgs(data);
        setOrganizations(data);
        if (data && data?.length == 1) {
          await handleOrgSelect(data[0]);
        }
        setLoading(false);
        setOrgError(false);
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong");
        setLoading(false);
        setOrgError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const checkCookiee = async () => {
    setLoading(true);
    const orgId = await fetchCookie("orgId");
    if (orgId) {
      const obj = JSON.parse(orgId);
      if (obj?.id) {
        await handleOrgSelect({
          id: obj?.id,
          name: "",
          image: null,
          address: null,
        });
        setLoading(false);
      } else {
        await getOrgs();
      }
    } else {
      await getOrgs();
    }
  };

  useEffect(() => {
    checkCookiee();
  }, []);

  useEffect(() => {
    if (getTeam) {
      if (selected && sports && sports.length > 0) {
        getTeams(sports[0]?.id);
      }
    }
  }, [getTeam]);
  //console.log(orgs);
  return (
    <div className="block w-full transition-all duration-200 ease-linear">
      {loading ? (
        <>
          <Skeleton className="h-14 w-full mb-4" />
          <Skeleton className="h-14 w-full mb-4" />
          <Skeleton className="h-14 w-full mb-4" />
        </>
      ) : sloading ? (
        <>
          <div className="text-center">
            <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 fill-primary mx-auto mb-4" />
            <p>{message}</p>
          </div>
        </>
      ) : (
        <>
          {steps == "teams" && (
            <TeamsSelection
              loading={tload}
              onSportChange={(sportId) => getTeams(Number(sportId))}
              create={() => setSteps("create")}
            />
          )}
          {steps == "organization" && (
            <>
              <h2 className="text-left text-gray-700 text-lg">
                Your Organizations
              </h2>
              <div className="flex items-center justify-center gap-2 flex-col mb-4">
                {orgs?.map((organization) => {
                  return (
                    <button
                      type="button"
                      key={organization?.id}
                      className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary hover:ring-primary sm:text-sm sm:leading-6"
                      onClick={() => handleOrgSelect(organization)}
                    >
                      <div className="flex items-center justify-start">
                        <img
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          src={
                            organization?.image
                              ? organization?.image
                              : Site?.placeholder
                          }
                          alt={organization?.name}
                        />
                        <div className="ml-3 block truncate text-black text-left">
                          <p className="m-0 text-left">{organization?.name}</p>
                          {organization?.address && (
                            <p className="m-0 text-gray-600 text-xs">
                              {returnAddress(organization?.address)}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <IconChevronRight classes={"w-4 h-4 fill-gray-700"} />
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* <div className="field">
              <div className="mt-6">
                <Link
                  href={"/account/register"}
                  className="btn btn--primary btn--full py-3"
                >
                  + Create New organization
                </Link>
              </div>
            </div> */}
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
            </>
          )}
          {steps == "create" && (
            <CreateTeam
              handleRefetch={handleRefetchTeam}
              onBack={() => setSteps("teams")}
            />
          )}
          {steps == "error" && (
            <div className="block w-full transition-all duration-200 ease-linear">
              <div className="text-center">
                <h2 className=" text-gray-700 text-lg text-center mb-0">
                  Unable to fetch Organizations
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  Please try again later or contact support.
                </p>
                <button
                  type="button"
                  className="btn btn--primary mx-auto"
                  onClick={() => logout()}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrganizationSelection;
