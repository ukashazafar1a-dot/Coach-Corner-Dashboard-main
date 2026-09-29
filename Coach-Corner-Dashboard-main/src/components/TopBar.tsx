"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
type props = {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  sticky?: boolean;
  back?: boolean;
};
const TopBar = ({ title, children, sticky = true, back = true }: props) => {
  const [isSticky, setIsSticky] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (sticky) {
      setTimeout(() => {
        setIsSticky("sticky top-0 z-3");
      }, 3000);
    }
  }, []);

  return (
    <>
      <div
        className={`${
          sticky ? isSticky : ""
        } bg-themeSoftBg md:px-6 px-4 py-3 flex flex-wrap items-center justify-between TopNavShadow mb-1`}
      >
        <div className="text-themeSecondary text-lg font-semibold flex items-center justify-start gap-3">
          {back && (
            <button type="button" onClick={() => router.back()}>
              <IoArrowBack className="w-5 h-5" />
            </button>
          )}
          {title}
        </div>
        {children && (
          <div className="flex flex-wrap items-center justify-end">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default TopBar;
