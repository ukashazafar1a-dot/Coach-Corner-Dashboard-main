
import React from "react";
import { team } from "@/helpers/DummyData";
import PlusIcon from "@/components/icons/PlusIcon";
import TopBar from "@/components/TopBar";
import RemoveMemberRow from "./RemoveMemberRow";

const RemoveMember = ({ prevStep }: any) => {
  return (
    <>
      {" "}
      <TopBar title="Create New Group" />
      <div className="overflow-hidden w-full py-5 px-4 flex flex-col">
        <div className="w-1/2 bg-blur mb-8">
          <div className="field">
            <label htmlFor="email" className="input--label">
              Enter group name
            </label>
            <input
              type="text"
              name="text"
              id=""
              placeholder="Groups 5"
              required
              className="input--field"
            />
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <label
            htmlFor="Select Team Role"
            className="input--label text-xl font-semibold text-themeTextColor   "
          >
            Group Members
          </label>
          <button onClick={prevStep}>
            <PlusIcon classes="inline-block pe-1 text-themePrimary" />
            <span className="text-themePrimary text-sm font-medium ">
              Add Member
            </span>
          </button>
        </div>

        <div className="block overflow-x-auto rounded-lg w-full border-2 border-primary">
          <table className="members--table w-full bg-transparent border-collapse rounded-lg -mt-1 relative pt-1">
            <thead className="bg-primary text-white">
              <tr>
                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100">
                  First Name
                </th>
                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100">
                  Last Name
                </th>
                <th className="tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100">
                  Email
                </th>
                <th className="tbl-header border-solid border-blueGray-100 bg-blueGray-50 text-blueGray-500">
                  Team Role
                </th>
                <th className=" max-w-24 tbl-header bg-blueGray-50 text-blueGray-500 border-solid border-blueGray-100">
                  <span className="sr-only">actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {team?.players?.map((player) => (
                <>
                  <RemoveMemberRow player={player} key={player.id} />
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RemoveMember;
