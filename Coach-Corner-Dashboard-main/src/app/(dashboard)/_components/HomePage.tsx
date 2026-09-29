"use client";
import React from "react";
import NoticeBlock from "./NoticeBlock";
import PracticeBlock from "./PracticeBlock";
import CurrentPlan from "./CurrentPlan";

const HomePage = () => {
  return (
    <div className="flex justify-between lg:flex-row flex-col pb-8">
      <div className="py-3 px-1  basis-full">
        <PracticeBlock />
      </div>
      <div className="in-sidebar basis-full md:basis-1/3 pt-3 px-1 pb-6 flex-shrink-0">
        <NoticeBlock />
        <CurrentPlan />
      </div>
    </div>
  );
};

export default HomePage;
