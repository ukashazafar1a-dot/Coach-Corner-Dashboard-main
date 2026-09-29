import useApp from "@/context/useApp";
import { currencyFormatter } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const CurrentPlan = () => {
  const { plan } = useApp();
  return (
    <div
      className={`mb-3 w-full rounded-lg overflow-hidden shadow border border-gray-200 bg-white text-black`}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={`text-lg font-bold m-0`}>Current Plan</h2>
        </div>
        <div className="space-y-1">
          <p className={`font-semibold`}>Basic</p>
          <p className={`text-base font-bold `}>
            12
            <span className="text-base font-normal">/Monthly</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className={`font-semibold uppercase `}>Features</p>
          <ul className="space-y-2">
            {plan?.features &&
              plan?.features.map((feature, index) => (
                <li key={index}>
                  <div className={`flex items-center space-x-2 `}>
                    {feature?.remainingQouta > 0 ? (
                      <IoCheckmarkSharp className={`h-5 w-5  `} />
                    ) : (
                      <RxCross2
                        className={`h-5 w-5 fill-red-500 text-red-500 `}
                      />
                    )}
                    <span>{feature?.type}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Link href={`/`} className={`mt-auto  mx-auto max-w-fit btn btn--primary`}>
          Change Plan
        </Link>
      </div>
    </div>
  );
};

export default CurrentPlan;
