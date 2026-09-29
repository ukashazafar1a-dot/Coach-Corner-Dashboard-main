"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiEye } from "react-icons/fi";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";

interface User {
  id: string;
  fName: string;
  lName: string;
  email: string;
}

interface Team {
  id: number;
  teamName: string;
  teamRole: string;
  status: string;
  user: User;
}

type ViewApprovalProps = {
  id: number;
};

const ViewApproval = ({ id }: ViewApprovalProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [team, setTeam] = useState<Team | null>(null);
  const { selectedTeam, setToaster } = useApp();

  const getTeamView = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/${selectedTeam?.id}/Approvals/${id}/View`
       
      );
      if (res && res?.succeeded) {
        setTeam(res?.data);
        console.log(res)
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching view approval:", error);
      setToaster("error", "Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getTeamView();
  }, [id]);
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-5 h-5">
          <FiEye className="w-5 h-5 stroke-gray-600" />
        </DialogTrigger>

        <DialogContent aria-describedby="dialog-description">
          {loading ? (
            <SectionLoader />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>View Team Details</DialogTitle>
              </DialogHeader>

              <p id="dialog-description" className="sr-only">
                This dialog allows you to view and manage team approval
                requests.
              </p>
              <div className="grid gap-6">
                {loading ? (
                  <SectionLoader />
                ) : team ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <strong>Team Name:</strong>
                      <p>{team.teamName}</p>
                    </div>
                    <div className="grid gap-2">
                      <strong>Team Role:</strong>
                      <p>{team.teamRole}</p>
                    </div>
                    <div className="grid gap-2">
                      <strong>Status:</strong>
                      <p>{team.status}</p>
                    </div>
                  </div>
                ) : (
                  <p>No data available.</p>
                )}

                {team && team?.user && (
                  <div className="grid gap-2 mt-4">
                    <h3>User Details</h3>
                    <div>
                      <strong>Name:</strong> {team?.user.fName}{" "}
                      {team?.user?.lName} {team?.user?.lName}
                    </div>
                    <div>
                      <strong>Email:</strong> {team?.user?.email}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewApproval;
