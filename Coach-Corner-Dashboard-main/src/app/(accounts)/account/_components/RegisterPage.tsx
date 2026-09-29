"use client";
import useStepForm from "@/hooks/useStepForm";
import PasswordField from "@/snippets/PasswordField";
import PlanSelectField from "@/snippets/PlanSelectField";
import Link from "next/link";
import React, { useState } from "react";
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelector from "@/components/CountrySelector";
import { billingType, direction, registerForm } from "@/helpers/types";
import useApp from "@/context/useApp";
import StripeContainer from "@/components/StripeContainer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const schema = z
  .object({
    billType: z.string(),
    packageId: z.string().min(1, { message: "Please select a package" }),
    organizationName: z
      .string()
      .min(1, { message: "Organization Name is required" }),
    organizationType: z
      .string()
      .min(1, { message: "Organization type is required" }),
    street: z.string().min(1, { message: "Street is required" }),
    areaTown: z.string().min(1, { message: "Area Town is required" }),
    city: z.string().min(1, { message: "City is required" }),
    zipCode: z.string().min(1, { message: "Zip Code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    fName: z.string().min(1, { message: "First Name is required" }),
    lName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Confirm password doesn't match with password.",
      path: ["confirmPassword"],
    }
  );

const RegisterPage = () => {
  const { setToaster, placeOrder } = useApp();
  const { changeStep, currentStep } = useStepForm();
  const {
    handleSubmit,
    clearErrors,
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
    watch,
  } = useForm<registerForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      billType: "Monthly",
      packageId: "",
      organizationName: "",
      street: "",
      zipCode: "",
      areaTown: "",
      bio: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [bill, setBill] = useState<billingType>("Monthly");

  const handleBillType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBill(value as any);
    setValue("billType", value);
  };
  const handleCountryChange = (value: string) => {
    if (value) {
      setValue("country", value);
    }
  };
  const handlePackageChange = (value: string) => {
    if (value) {
      setValue("packageId", value);
    }
  };
  const handleChangeStep = async (step: direction) => {
    if (currentStep == "Organization") {
      const res = await trigger([
        "bio",
        "city",
        "country",
        "zipCode",
        "street",
        "state",
        "organizationType",
        "organizationName",
        "areaTown",
      ]);
      if (res) {
        changeStep("next");
      } else {
        return;
      }
    }
    //changeStep(step);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "password") {
      setValue("password", e.target.value);
    } else {
      setValue("confirmPassword", e.target.value);
    }
  };
  const onSubmit = async (data: registerForm) => {
    console.log("here is the form data", data);
    // Handle form submission
    try {
      const res: any = await placeOrder(data);
      console.log(res);
      if (res && res?.succeeded) {
        changeStep("next");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="block bg-blur w-full reg-org"
      >
        {currentStep == "Organization" && (
          <>
            <PlanSelectField onSelectChange={handlePackageChange} />
            <p className="py-2 text-gray-800 text-base font-medium">
              Billing Type
            </p>
            <div className="flex items-center justify-start gap-3 field-type-fields mb-4 flex-wrap">
              <div>
                <input
                  type="radio"
                  id="Monthly"
                  value="Monthly"
                  checked={bill === "Monthly"}
                  onChange={handleBillType}
                  className="sr-only"
                />
                <label
                  htmlFor="Monthly"
                  className="px-3 py-1 border border-inputBorder text-inputBorder cursor-pointer rounded"
                >
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Yearly"
                  value="Yearly"
                  checked={bill === "Yearly"}
                  onChange={handleBillType}
                  className="sr-only"
                />
                <label
                  htmlFor="Yearly"
                  className="px-3 py-1 border border-inputBorder text-inputBorder cursor-pointer rounded"
                >
                  Yearly
                </label>
              </div>
            </div>
            {errors.billType && (
              <p className="py-2 text-sm font-medium text-red-400">
                {errors?.billType.message}
              </p>
            )}
            <div className="form-wrapper p-0 w-full">
              <div className="field">
                <label htmlFor="organizationName" className="input--label">
                  Organization Name
                </label>
                <p className="input--info">
                  <span className="font-medium">Full School/Program Name</span>{" "}
                  (no abbreviations, ie: yes = Baton Rouge High School, no =
                  BRHS)*
                </p>
                <input
                  type="text"
                  id="organizationName"
                  autoComplete="organization Name"
                  className="input--field"
                  {...register("organizationName")}
                />
                {errors.organizationName && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors.organizationName.message}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="organizationType" className="input--label">
                  Organization Type
                </label>
                <input
                  type="text"
                  id="organizationType"
                  autoComplete="organization Name"
                  className="input--field"
                  {...register("organizationType")}
                />
                {errors.organizationType && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors.organizationType.message}
                  </p>
                )}
              </div>
              <div className="field w-full">
                <label htmlFor="bio" className="input--label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={2}
                  className="text--field"
                  {...register("bio")}
                ></textarea>
                {errors.bio && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors.bio.message}
                  </p>
                )}
              </div>
              <p className="py-2 text-gray-800 text-base font-medium">
                Organization Address
              </p>
              <div className="flex items-start justify-start gap-2">
                <div className="field basis-full md:basis-auto w-full">
                  <label htmlFor="street" className="input--label">
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    autoComplete="street"
                    className="input--field"
                    {...register("street")}
                  />
                  {errors?.street && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors.street.message}
                    </p>
                  )}
                </div>
                <div className="field basis-full md:basis-auto w-full">
                  <label htmlFor="areaTown" className="input--label">
                    Area Town
                  </label>
                  <input
                    type="text"
                    id="areaTown"
                    autoComplete="areaTown"
                    className="input--field"
                    {...register("areaTown")}
                  />
                  {errors?.areaTown && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.areaTown?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-start gap-2">
                <div className="field basis-full md:basis-auto w-full">
                  <label htmlFor="city" className="input--label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    autoComplete="city"
                    className="input--field"
                    {...register("city")}
                  />
                  {errors?.city && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.city?.message}
                    </p>
                  )}
                </div>
                <div className="field basis-full md:basis-auto w-full">
                  <label htmlFor="state" className="input--label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    autoComplete="state"
                    className="input--field"
                    {...register("state")}
                  />
                  {errors?.state && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.state.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-start gap-2">
                <div className="field basis-full md:basis-auto w-full">
                  <label htmlFor="zipCode" className="input--label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    autoComplete="zipCode"
                    className="input--field"
                    {...register("zipCode")}
                  />
                  {errors?.zipCode && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.zipCode?.message}
                    </p>
                  )}
                </div>
                <div className="field basis-full md:basis-auto w-full">
                  <label htmlFor="country" className="input--label">
                    Country
                  </label>
                  <CountrySelector
                    onChange={handleCountryChange}
                    count={watch("country")}
                  />
                  {errors?.country && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.country?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <div className="mt-6">
                  <button
                    type="submit"
                    onClick={(e) => handleChangeStep("next")}
                    className="btn btn--primary btn--full py-3"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {currentStep == "Profile" && (
          <>
            <h2 className="text-center text-gray-700 text-lg">Register Now</h2>
            <div className="form-wrapper p-0 w-full">
              <div className="field">
                <label htmlFor="fName" className="input--label">
                  First Name
                </label>
                <input
                  type="text"
                  id="fName"
                  autoComplete="fName"
                  className="input--field"
                  {...register("fName")}
                />
                {errors?.fName && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors?.fName?.message}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="lName" className="input--label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lName"
                  autoComplete="lName"
                  className="input--field"
                  {...register("lName")}
                />
                {errors?.lName && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors?.lName?.message}
                  </p>
                )}
              </div>
              <div className="field w-full">
                <label htmlFor="Email" className="input--label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="email"
                  className="input--field"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="password" className="input--label">
                  Password
                </label>
                <PasswordField
                  name="password"
                  placeholder=""
                  onChange={handleInputChange}
                />
                {errors?.password && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="field mb-3">
                <label htmlFor="confirmPassword" className="input--label">
                  Confirm Password
                </label>
                <PasswordField
                  name="confirmPassword"
                  placeholder=""
                  onChange={handleInputChange}
                />
                {errors?.confirmPassword && (
                  <p className="py-2 text-sm font-medium text-red-400">
                    {errors?.confirmPassword?.message}
                  </p>
                )}
              </div>
              <div className="field">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => changeStep("prev")}
                    className="btn btn--secondary btn--full py-3"
                  >
                    Prev
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary btn--full py-3"
                  >
                    <span>Proceed</span>
                    {isSubmitting && (
                      <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep !== "Payment" && (
          <div className="form-actions">
            <div className="relative flex items-center justify-center flex-col my-6">
              <hr className="w-full" />
              <span
                className="px-2 bg-white absolute w-fit m-0 text-sm"
                style={{ left: "50%", transform: "translate(-50%)" }}
              >
                Or
              </span>
            </div>
            <div className="flex gap-2 items-center justify-between mb-2">
              <p>Sign In With Google</p>
              <p>Sign In With Facebook</p>
            </div>
            <div className="block">
              <p className="m-0">
                Already have a Account?{" "}
                <Link
                  href="/account/login"
                  className="text-primary font-medium"
                >
                  Login Now<span aria-hidden="true">&rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </form>
      {currentStep == "Payment" && (
        <>
          <StripeContainer onCancelChange={() => console.log("clicked")} />
        </>
      )}
    </>
  );
};

export default RegisterPage;
