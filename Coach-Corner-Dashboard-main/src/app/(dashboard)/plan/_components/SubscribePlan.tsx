"use client";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlinePercentage } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import Link from "next/link";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import useApp from "@/context/useApp";
import { currencyFormatter, formatDate } from "@/lib/utils";
import PrimaryChip from "@/components/PrimaryChip";
type subscipt = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  amount: number;
  billType: string;
  status: string;
};
const SubscribePlan = () => {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<subscipt[] | null>(null);
  const { setToaster } = useApp();

  const getSubs = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Organization/Subscriptions`);
      console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setSubs(data?.items);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubs();
  }, []);

  return (
    <div>
      <TopBar title="Subscriptions" back={false} />
      {loading ? (
        <SectionLoader />
      ) : (
        <div className="px-4 py-12">
          <div className="flex items-center justify-start md:justify-between gap-2 w-full mb-4 flex-col md:flex-row">
            <div>
              <h3 className="text-base font-semibold m-0">Plan Details</h3>
              <CardDescription className="text-sm">
                View the terms of service and privacy policy
              </CardDescription>
            </div>
            <button className="btn btn--secondary">Change Plan</button>
          </div>
          <div className="flex items-start justify-start gap-2">
            {subs &&
              subs.map((sub) => {
                return (
                  <Card className="md:min-w-96 max-w-xl p-4" key={sub?.id}>
                    <CardHeader className="p-0 mb-3">
                      <CardTitle>{sub?.name} <PrimaryChip title={sub?.status} /></CardTitle>
                      
                    </CardHeader>
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-end gap-1 mb-4">
                          <span className="text-3xl font-bold">
                            {currencyFormatter(sub?.amount)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /{sub?.billType === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-1 text-gray-700">
                        Start at: {formatDate(sub?.startDate)}
                      </p>
                      <p className="text-sm mb-2 text-red-600">
                        Ends on: {formatDate(sub?.endDate)}
                      </p>
                      {/* <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <LuUser className="h-4 w-4 text-muted-foreground" />
                          <span>2 staff members</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AiOutlinePercentage className="h-4 w-4 text-muted-foreground" />
                          <span>Up to 77% shipping discount</span>
                        </div>
                      </div> */}
                    </div>
                    {/* <CardFooter className="p-0">
                      <Link href="#" className="btn btn--primary">
                        View all features
                      </Link>
                    </CardFooter> */}
                  </Card>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribePlan;
