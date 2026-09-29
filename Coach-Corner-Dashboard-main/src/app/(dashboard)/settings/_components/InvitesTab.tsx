"use client";
import React, { useEffect, useState } from "react";
import SingleInviteUi from "./SingleInviteUi";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import { Skeleton } from "@/components/ui/skeleton";

const InvitesTab = () => {
  const { setToaster } = useApp();
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState<any>([]);

  const getInvites = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        "/api/Accounts/Profile/Invites?pageNo=1&pageSize=10"
      );
      console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setInvites(data?.items);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInvites();
  }, []);
  return (
    <div className="pb-6">
      <p className="mb-4">Your Invitations</p>
      {loading ? (
        <>
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
        </>
      ) : (
        <div className="max-w-screen-md me-auto">
          <div className="p-2 rounded border flex items-center justify-between flex-wrap mb-3">
            <div className="flex items-center justify-start gap-2">
              <img
                src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
                alt=""
                className="max-w-full rounded-full w-8 h-8"
              />
              <p>Organization Name</p>
            </div>
            <div className="flex items-center justify-end gap-2 flex-col sm:flex-row">
              <p className="text-sm text-gray-600">
                Invitation expire in 3 days
              </p>
              <div className="flex items-center justify-end gap-2">
                <button className="btn btn--primary">Accept</button>
                <button className="btn btn--secondary">Decline</button>
              </div>
            </div>
          </div>
          <div className="p-2 rounded border flex items-center justify-between flex-wrap mb-3">
            <div className="flex items-center justify-start gap-2">
              <img
                src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
                alt=""
                className="max-w-full rounded-full w-8 h-8"
              />
              <p>Organization Name</p>
            </div>
            <div className="flex items-center justify-end gap-2 flex-col sm:flex-row">
              <p className="text-sm text-gray-600">
                Invitation expire in 3 days
              </p>
              <div className="flex items-center justify-end gap-2">
                <button className="btn btn--primary">Accept</button>
                <button className="btn btn--secondary">Decline</button>
              </div>
            </div>
          </div>
          <div className="p-2 rounded border flex items-center justify-between flex-wrap mb-3">
            <div className="flex items-center justify-start gap-2">
              <img
                src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
                alt=""
                className="max-w-full rounded-full w-8 h-8"
              />
              <p>Organization Name</p>
            </div>
            <div className="flex items-center justify-end gap-2 flex-col sm:flex-row">
              <p className="text-sm text-gray-600">
                Invitation expire in 3 days
              </p>
              <div className="flex items-center justify-end gap-2">
                <button className="btn btn--primary">Accept</button>
                <button className="btn btn--secondary">Decline</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitesTab;
