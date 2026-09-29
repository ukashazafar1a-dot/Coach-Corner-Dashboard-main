"use client";
import IconChevronRight from "@/components/icons/IconChevronRight";
import TopBar from "@/components/TopBar";
import useApp from "@/context/useApp";
import { Site } from "@/helpers/Site";
import { returnAddress } from "@/lib/utils";
import React from "react";

const OrganizationsPage = () => {
  const { organization, organizations, teams } = useApp();
  return (
    <div>
      <TopBar title="Organizations" />
      <div className="px-4 py-12">
        <div className="max-w-screen-md me-auto">
          <h2 className="text-left text-gray-700 text-lg">
            Your Organizations
          </h2>
          <div className="flex items-center justify-center gap-2 flex-col mb-4">
            {organizations?.map((org) => {
              return (
                <React.Fragment key={org?.id}>
                  <button
                    type="button"
                    className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary hover:ring-primary sm:text-sm sm:leading-6"
                  >
                    <div className="flex items-center justify-start">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={org?.image ? org?.image : Site?.placeholder}
                        alt={org?.name}
                      />
                      <div className="ml-3 block truncate text-black text-left">
                        <p className="m-0 text-left">{org?.name}</p>
                        {org?.address && (
                          <p className="m-0 text-gray-600 text-xs">
                            {returnAddress(org?.address)}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <IconChevronRight classes={"w-4 h-4 fill-gray-700"} />
                    </span>
                  </button>
                  {org?.id === organization?.id && (
                    <div className="w-10/12 ms-auto">
                      <p className="text-left text-gray-700 text-base">
                        Your Teams
                      </p>
                      <>
                        {teams && teams?.length > 0 ? (
                          <div className="flex items-center justify-center gap-2 flex-col mb-4">
                            {teams?.map((team) => {
                              return (
                                <button
                                  type="button"
                                  key={team?.id}
                                  className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary hover:ring-primary sm:text-sm sm:leading-6"
                                >
                                  <div className="flex items-center justify-start">
                                    <img
                                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                      src={
                                        team?.image
                                          ? team?.image
                                          : Site?.placeholder
                                      }
                                      alt={team?.name}
                                    />
                                    <div className="ml-3 block truncate text-black text-left">
                                      <p className="m-0 text-left">
                                        {team?.name}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <IconChevronRight
                                      classes={"w-4 h-4 fill-gray-700"}
                                    />
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
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
