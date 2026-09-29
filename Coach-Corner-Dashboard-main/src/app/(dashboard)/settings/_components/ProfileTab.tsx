"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserImage from "./UserImage";
import SubmitButton from "@/components/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import { DateInput } from "@/components/ui/DateInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const formatDateToISO = (dateString: string | null) => {
  if (!dateString) return "";

  // Parse the input date string
  const [month, day, yearAndTime] = dateString.split("/");
  const [year] = yearAndTime.split(" ");

  if (!month || !day || !year) {
    throw new Error(
      "Invalid date format. Expected format is MM/DD/YYYY HH:mm:ss"
    );
  }

  // Return the formatted date as yyyy-MM-dd
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const schema = z.object({
  fName: z.string().min(1, { message: "First Name is required" }),
  lName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Email invalid" }),
  about: z.string().nullable(),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^\+\d{1,3}\s?\d{4,14}$/, {
      message:
        "Phone number must be in international format (e.g., +123 4567890)",
    }),
  image: z.any(),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  height: z.coerce.string().min(1, { message: "Height is required" }),
  weight: z.coerce.string().min(1, { message: "Weight is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
});
type formType = z.infer<typeof schema>;
const ProfileTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      about: "",
      phone: "",
      image: null,
      dob: "",
      height: "",
      weight: "",
      gender: "",
    },
  });
  const [src,setSrc] = useState<string | null>(null);
  const { setToaster } = useApp();
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<any>(null);
  const onSubmit = async (data: formType) => {
    try {
      //console.log(data);
      const form = new FormData();
      form.append("Image", data.image ? data?.image : "");
      form.append("DOB", data.dob ? new Date(data?.dob).toISOString() : "");
      form.append("Height", data.height ? data?.height.toString() : "");
      form.append("Weight", data.weight ? data?.weight.toString() : "");
      form.append("Gender", data.gender ? data?.gender : "");
      form.append("Phone", data.phone ? data?.phone : "");
      form.append("About", data.about ? data?.about : "");
      form.append("FName", data.fName ? data?.fName : "");
      form.append("LName", data.lName ? data?.lName : "");
      const res = await fetchClient(`/api/Accounts/profile/Edit`, {
        method: "POST",
        body: form,
      });
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Profile updated successfully"
        );
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await fetchClient("/api/Accounts/profile");
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setValue("fName", data?.fName);
        setValue("lName", data?.lName);
        setValue("email", data?.email);
        setValue("about", data?.bio);
        setValue("phone", data?.phoneNumber);
        setSrc(data?.image);
        const moreInfo = data?.personalClaims;
        //console.log(moreInfo)
        if (moreInfo != null) {
          setValue("height", moreInfo?.height);
          setValue("weight", moreInfo?.weight);
          setValue("gender", moreInfo?.gender);
          setValue(
            "dob",
            moreInfo?.dob ? formatDateToISO(moreInfo.dob) : ""
          );
        }
      }else{
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  // console.log(watch("image"));
  // console.log(getValues())
  return (
    <form
      className={`max-w-screen-sm me-auto pb-8 relative ${
        loading ? "small--loader" : ""
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <p className="mb-2">Profile picture</p>
        <UserImage
          onChange={(file: any) => setValue("image", file)}
          label="Logo"
          image={src ? src : watch("image")}
        />
      </div>
      <div className="flex items-start justify-center gap-2 flex-col md:flex-row mb-3">
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="fName" className="input_label">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="fName"
            {...register("fName")}
            className="input--field"
          />
          {errors?.fName && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.fName?.message}
            </p>
          )}
        </div>
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="lName" className="input_label">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="lName"
            {...register("lName")}
            className="input--field"
          />
          {errors?.lName && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.lName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start justify-center gap-2 flex-col md:flex-row mb-3">
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="phone" className="input_label">
            Phone No. <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="input--field"
          />
          {errors?.phone && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.phone?.message}
            </p>
          )}
        </div>
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="dob" className="input_label">
            Date of birth
          </label>
          <DateInput
            type="date"
            id="dob"
            value={watch("dob")}
            onChange={(e) => setValue("dob", e.target.value)}
            className="input--field"
          />
          {errors?.dob && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.dob?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start justify-center gap-2 flex-col md:flex-row mb-3">
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="input--field"
            readOnly
          />
          {errors?.email && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="height" className="input_label">
            Height
          </label>
          <div className="relative">
            <input
              type="number"
              id="height"
              value={watch("height")}
              onChange={(e) => setValue("height", e.target.value)}
              className="input--field"
              min={0}
              step={0.01}
            />
            <p className="p-1 bg-white h-full absolute top-0 right-0 me-0.5 text-sm rounded-tr rounded-br flex items-center justify-center text-center border-t border-b">
              ft
            </p>
          </div>
          {errors?.height && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.height?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start justify-center gap-2 flex-col md:flex-row mb-3">
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="weight" className="input_label">
            Weight
          </label>
          <div className="relative">
            <input
              type="number"
              id="weight"
              value={watch("weight")}
              onChange={(e) => setValue("weight", e.target.value)}
              min={0}
              className="input--field"
              step={0.01}
            />
            <p className="p-1 bg-white h-full absolute top-0 right-0 me-0.5 text-sm rounded-tr rounded-br flex items-center justify-center text-center border-t border-b">
              kg
            </p>
          </div>
          {errors?.weight && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.weight?.message}
            </p>
          )}
        </div>
        <div className="basis-full md:basis-auto w-full">
          <label htmlFor="gender" className="input_label">
            Gender
          </label>
          <Select
            value={watch("gender")}
            onValueChange={(value) => setValue("gender", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              {["Male", "Female", "other"].map((gender) => {
                return (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {errors?.gender && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.gender?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-3">
        <div className=" w-full">
          <label htmlFor="about" className="input_label">
            About
          </label>
          <textarea
            id="about"
            {...register("about")}
            className="input--field"
            rows={5}
          />
          {errors?.about && (
            <p className="py-2 text-red-400 font-medium text-sm">
              {errors?.about?.message}
            </p>
          )}
        </div>
      </div>
      <div className="py-2 ">
        {msgs &&
          msgs?.map((msg: any, index: number) => {
            return (
              <p className="mb-1 text-red-400 font-medium text-sm" key={index}>
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
  );
};

export default ProfileTab;
