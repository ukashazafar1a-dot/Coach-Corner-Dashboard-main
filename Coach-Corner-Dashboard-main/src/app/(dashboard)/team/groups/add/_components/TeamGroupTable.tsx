import PrimaryChip from "@/components/PrimaryChip";
import TopBar from "@/components/TopBar";
import { team } from "@/helpers/DummyData";
import Link from "next/link";
import React from "react";
import AddGroupRow from "../../_components/AddGroupRow";

const TeamGroupTable = ({ nextStep }: any) => {
  return (
    <>
      <TopBar title="Add New Member" />

      <div className="overflow-hidden w-full py-5 px-4 flex flex-col">
        <div className="block overflow-x-auto rounded-lg w-full border-2 border-primary">
          <table className="members--table w-full bg-transparent border-collapse rounded-lg -mt-1 relative pt-1">
            <thead className="bg-primary text-white">
              <tr>
                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100 max-md:text-xs max-sm:px-1">
                  First Name
                </th>
                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100 max-md:px-1 max-sm:text-xs">
                  Last Name
                </th>
                <th className="tbl-header  bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100 hidden max-md:block max-md:px-1 max-md:border-0"></th>

                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100 max-md:hidden">
                  Email
                </th>
                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100 max-md:hidden">
                  Team Role
                </th>
                <th className=" max-w-24 tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100 ">
                  <span className="sr-only">actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {team?.players?.map((player) => {
                return <AddGroupRow player={player} key={player.id} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="field">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href={""} className="btn btn--secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn--primary"
              onClick={nextStep}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamGroupTable;
