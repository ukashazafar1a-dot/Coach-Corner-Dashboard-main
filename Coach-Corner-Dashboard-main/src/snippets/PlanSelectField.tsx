"use client";
import IconPayment from "@/components/icons/IconPayment";
import useApp from "@/context/useApp";
import { baseURL } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type plans = plan[];
type plan = {
  id: string;
  name: string;
  price: number;
};
type props = {
  onSelectChange: (value: string) => void;
};
const PlanSelectField = ({ onSelectChange }: props) => {
  const [packages, setPackages] = useState<plans | null>(null);
  const { setToaster } = useApp();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<plan | null>(null);
  const [billingType, setBillingType] = useState<"Monthly" | "Yearly">(
    "Monthly"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handlePlanSelect = (plan: plan) => {
    setSelected(plan);
    setOpen(!open);
    if (onSelectChange) {
      onSelectChange(plan?.id);
    }
  };
  const getPackages = async () => {
    try {
      const res = await fetch(`${baseURL}/api/Catalog/Packages/Select`);
      if (!res?.ok) {
        setLoading(false);
        setError(true);
        return null;
      }
      const result = await res?.json();
      //console.log(result);
      if (result && result?.succeeded) {
        setPackages(result?.data);
        setSelected(result.data[0]);
        if (onSelectChange) {
          onSelectChange(result?.data[0]?.id);
        }
        setLoading(false);
        setError(false);
      } else {
        setPackages(null);
        setLoading(false);
        setToaster("error", result?.messages[0] || "Something went wrong!");
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getPackages();
  }, []);

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-black" />
      ) : error ? (
        <p className="p-3 rounded border border-amber-300 mb-3">Failed to Load data.</p>
      ) : (
        <div className="relative my-2">
          <button
            type="button"
            className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-start">
              <IconPayment classes={"w-10 h-10 fill-primary"} />
              <div className="ml-3 block truncate text-black">
                <p className="m-0">Plan: {selected?.name}</p>
                <p className="m-0">
                  Bill: ${selected?.price}.00 / {billingType}
                </p>
              </div>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <ul
            className={`transition ease-in duration-100 ${
              open ? "opacity-100 show" : "hidden opacity-0"
            } absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {packages?.map((plan) => {
              return (
                <li
                  key={plan?.id}
                  className={`${
                    plan.id == selected?.id
                      ? "bg-indigo-500 text-white"
                      : " bg-white text-black"
                  } relative group select-none py-2 pl-3 pr-9 cursor-pointer`}
                  id="listbox-option-0"
                  onClick={() => handlePlanSelect(plan)}
                  role="option"
                >
                  <div className="flex items-start">
                    <IconPayment
                      classes={`w-10 h-10 ${
                        plan.id == selected?.id ? "fill-white" : "fill-primary"
                      }`}
                    />
                    <div className="ml-3 block truncate">
                      <p className="m-0">Plan: {plan?.name}</p>
                      <p className="m-0">
                        Bill: ${plan?.price}.00 / {billingType}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`${
                      plan.id == selected?.id
                        ? "text-white opacity-100"
                        : "text-indigo-600 opacity-0"
                    } absolute inset-y-0 right-0  flex items-center pr-4 hover:text-indigo-600 group-hover:opacity-100`}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default PlanSelectField;
