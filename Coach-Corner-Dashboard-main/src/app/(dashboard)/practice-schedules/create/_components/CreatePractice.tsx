"use client";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelector from "@/components/CountrySelector";
import useApp from "@/context/useApp";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { DateInput } from "@/components/ui/DateInput";
import RichTextEditor from "@/hooks/RichTextEditor";
import GroupSelect from "@/components/GroupSelect";
import fetchClient from "@/hooks/fetchClient";

const schema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  note: z.string().min(1, { message: "Note is required" }),
  groupId: z.any({ message: "Group is optional" }).nullable(),
  startTime: z.string().min(1, { message: "Start Time is required" }),
  endTime: z.string().min(1, { message: "End Time is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  areaTown: z.string().min(1, { message: "Area Town is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipCode: z.string().min(1, { message: "Zip Code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
});
type formType = z.infer<typeof schema>;

const formatePayload = (data: formType) => {
  return {
    groupId: data?.groupId,
    startTime: data?.startTime,
    title: data?.name,
    endTime: data?.endTime,
    location: {
      street: data?.street,
      areaTown: data?.areaTown,
      city: data?.city,
      state: data?.state,
      zipCode: data?.zipCode,
      country: data?.country,
    },
    note: data?.note,
  };
};
const formatDate = (isoString: string) => {
  const date = new Date(isoString); // Create a Date object from the ISO string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
const CreatePractice = () => {
  const { setToaster, organization, selectedTeam, user } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      note: "",
      groupId: null,
      startTime: "",
      endTime: "",
      street: "",
      areaTown: "",
      city: "",
      zipCode: "",
      country: "",
      state: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [noGroup, setNoGroup] = useState(true);
  const router = useRouter();

  const handleCountryChange = (value: string) => {
    if (value) {
      setValue("country", value);
    }
  };
  const handleDateChange = (type: "startTime" | "endTime", value: string) => {
    if (value) {
      const date = new Date(value);
      setValue(type, date.toISOString());
    } else {
      setValue(type, "");
    }
  };
  const onSubmit = async (data: formType) => {
    console.log(data);
    try {
      const formData = formatePayload(data);
      const res = await fetchClient(
        `/api/PracticeSchedules/${selectedTeam?.id}/schedule/New`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );
      // console.log(res);
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Practice Schedule created successfully"
        );
        router.push("/practice-schedules");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(watch("startTime"), watch("endTime"));
  return (
    <div className="block">
      <TopBar title="Create Practice Schedule" back={true} />
      <div className="block">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 md:p-4 bg-slate-100"
        >
          <div className="flex justify-between items-start gap-5 max-md:flex-col">
            <div className="space-y-4 basis-2/3 w-[66%] max-md:w-full">
              <div className="bg-white p-3 rounded-lg w-full mb-4">
                <div className="field">
                  <label htmlFor="name" className="input--label">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="input--field"
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-sm py-2">
                      {errors?.name.message}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="note" className="input--label">
                    Note
                  </label>
                  <RichTextEditor
                    type="half"
                    value={watch("note")}
                    onChange={(value) => setValue("note", value)}
                  />
                  {errors?.note && (
                    <p className="text-red-500 text-sm py-2">
                      {errors?.note.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg w-full mb-4">
                <p className="text-primary font-semibold mb-2">Address</p>
                <div className="flex items-start justify-start gap-2 flex-col md:flex-row">
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
                      autoComplete="areatown"
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
                <div className="flex items-start justify-start gap-2 flex-col md:flex-row">
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
                <div className="flex items-start justify-start gap-2 flex-col md:flex-row">
                  <div className="field basis-full md:basis-auto w-full">
                    <label htmlFor="zipcode" className="input--label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      autoComplete="zipcode"
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
              </div>
            </div>
            <div className="w-full basis-1/3 space-y-4">
              <div className="bg-white p-3 rounded-lg w-full mb-4">
                {noGroup && (
                  <div className="field basis-full md:basis-1/3 m-0 w-full mb-4">
                    <label htmlFor="Select Team Role" className="input--label">
                      Select Group{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <GroupSelect
                      id={watch("groupId")}
                      onChange={(value) => setValue("groupId", value)}
                      label={false}
                      onEmpty={(value) => setNoGroup(value)}
                    />
                    {errors?.groupId && (
                      <p className="py-2 text-red-400 text-sm">
                        {errors?.groupId?.message
                          ? (errors?.groupId?.message as string)
                          : ""}
                      </p>
                    )}
                  </div>
                )}
                <div className="basis-full md:basis-auto w-full mb-3">
                  <label htmlFor="startTime" className="input_label">
                    Start Time
                  </label>
                  <DateInput
                    type="datetime-local"
                    id="startTime"
                    value={
                      watch("startTime")
                        ? formatDate(watch("startTime"))
                        : undefined
                    }
                    onChange={(e) =>
                      handleDateChange("startTime", e.target.value)
                    }
                    className="input--field"
                  />
                  {errors?.startTime && (
                    <p className="py-2 text-red-400 font-medium text-sm">
                      {errors?.startTime?.message}
                    </p>
                  )}
                </div>
                <div className="basis-full md:basis-auto w-full">
                  <label htmlFor="endTime" className="input_label">
                    End Time
                  </label>
                  <DateInput
                    type="datetime-local"
                    id="endTime"
                    value={
                      watch("endTime")
                        ? formatDate(watch("endTime"))
                        : ""
                    }
                    onChange={(e) =>
                      handleDateChange("endTime", e.target.value)
                    }
                    className="input--field"
                  />
                  {errors?.endTime && (
                    <p className="py-2 text-red-400 font-medium text-sm">
                      {errors?.endTime?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <SubmitButton
                loading={isSubmitting}
                disabled={isSubmitting}
                type="submit"
              >
                Save
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePractice;
