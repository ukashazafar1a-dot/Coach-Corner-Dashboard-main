"use client";
import { Step, direction } from "@/helpers/types";
import React, { useState } from "react";

const useStepForm = () => {
  const [currentStep, setCurrentStep] = useState<Step>("Organization");
  const changeStep = (direction: direction) => {
    if (direction === "prev" && currentStep !== "Organization") {
      setCurrentStep((prevStep: Step) => {
        switch (prevStep) {
          case "Profile":
            return "Organization";
          case "Payment":
            return "Profile";
          default:
            return prevStep;
        }
      });
    } else if (direction === "next" && currentStep !== "Payment") {
      setCurrentStep((prevStep: Step) => {
        switch (prevStep) {
          case "Organization":
            return "Profile";
          case "Profile":
            return "Payment";
          default:
            return prevStep;
        }
      });
    }
  };
  return { currentStep, changeStep };
};

export default useStepForm;
