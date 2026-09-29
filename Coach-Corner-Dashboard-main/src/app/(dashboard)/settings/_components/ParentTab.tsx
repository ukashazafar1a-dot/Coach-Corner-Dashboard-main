"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "react-hook-form";
import useApp from "@/context/useApp";
import { useState } from "react";
import { useParams } from "next/navigation";
import fetchClient from "@/hooks/fetchClient";

let schema = z.object({
  fullName: z.string().min(1, { message: "Name is required" }),
  primaryNumber: z
    .string()
    .min(1, { message: "Number is required" })
    .regex(/^\+\d{1,3}\s?\d{4,14}$/, {
      message:
        "Phone number must be in international format (e.g., +123 4567890)",
    }),
  secondaryNumber: z
    .string()
    .regex(/^\+\d{1,3}\s?\d{4,14}$/, {
      message:
        "Phone number must be in international format (e.g., +123 4567890)",
    })
    .nullable(),
  email: z.string().email({ message: "Invalid Email" }),
});
type FromType = z.infer<typeof schema>;
const ParentTab = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<FromType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      primaryNumber: "",
      secondaryNumber: null,
      email: "",
    },
  });
  const params = useParams();
  const { setToaster } = useApp();
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<string[] | null>(null);
  const onSubmit = async (data: FromType) => {
    try {
      //console.log(data);
      const res = await fetchClient(
        `/api/Accounts/Profile/Parent/Edit`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Parent info updated successfully!"
        );
        setMsgs(null);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
        setMsgs(res?.messages);
        throw new Error(res?.messages[0] || "Something went wrong", {
          cause: res,
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong", { cause: error });
    }
  };
  const getProfile = async () => {
    try {
      setLoading(true)
      const res = await fetchClient("/api/Accounts/profile/parent/edit");
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setValue("fullName", data?.fullName ? data?.fullName : "");
        setValue("primaryNumber", data?.primaryNumber ? data?.primaryNumber : "");
        setValue("secondaryNumber", data?.secondaryNumber ? data?.secondaryNumber : "");
        setValue("email", data?.email ? data?.email : "");
      }else{
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className={`max-w-screen-sm me-auto pb-8 relative ${loading ? 'small--loader' : ''}`}>
      <div className="mb-4">
        <h3>Parent Info</h3>
      </div>
      <form
        className="max-w-screen-sm mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="fullName" className="input_label">
            Parent Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="input--field"
          />
          {errors?.fullName && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.fullName?.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className="input--field"
          />
          {errors?.email && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="flex items-start justify-center gap-2 flex-col md:flex-row mb-3">
          <div className="basis-full md:basis-auto w-full">
            <label htmlFor="primaryNumber" className="input_label">
              Phone No. <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="primaryNumber"
              {...register("primaryNumber")}
              className="input--field"
            />
            {errors?.primaryNumber && (
              <p className="py-2 text-red-400 font-medium text-sm">
                {errors?.primaryNumber?.message}
              </p>
            )}
          </div>
          <div className="basis-full md:basis-auto w-full">
            <label htmlFor="secondaryNumber" className="input_label">
              Phone No.{" "}
              <span className="text-gray-500 text-xs">(secondary)</span>
            </label>
            <input
              type="tel"
              id="secondaryNumber"
              {...register("secondaryNumber")}
              className="input--field"
            />
            {errors?.secondaryNumber && (
              <p className="py-2 text-red-400 font-medium text-sm">
                {errors?.secondaryNumber?.message}
              </p>
            )}
          </div>
        </div>{" "}
        <div className="py-2">
          {msgs &&
            msgs?.map((msg, index) => {
              return (
                <p
                  className="mb-1 text-red-400 font-medium text-sm"
                  key={index}
                >
                  {msg}
                </p>
              );
            })}
        </div>
        <div className="flex items-center justify-end gap-2 p-2">
          <SubmitButton
            className="btn btn--primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default ParentTab;
