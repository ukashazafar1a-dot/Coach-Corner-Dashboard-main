"use client";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionLoader from "@/components/loaders/SectionLoader";
import TopBar from "@/components/TopBar";
import { IoArrowBack } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageBlock from "./ImageBlock";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import CountrySelector from "@/components/CountrySelector";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  logo: z.any().nullable(),
  icon: z.any().nullable(),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  areaTown: z.string().min(1, { message: "Area Town is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipCode: z.string().min(1, { message: "Zip Code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
});
type formType = z.infer<typeof schema>;

type orgn = {
  id: string;
  name: string;
  type: string;
  logo: null | string;
  icon: null | string;
  description: string | null;
  street: string | null;
  areaTown: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
};

const OrganizationPage = () => {
  const {
    setToaster,
    organization,
    selectedTeam,
    user,
  } = useApp();
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
      logo: null,
      icon: null,
      description: "",
      type: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [orgn, setOrgn] = useState<orgn | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const form = new FormData();
      form.append("Name", data?.name);
      form.append("Logo", data?.logo || "");
      form.append("Icon", data?.icon || "");
      form.append("Description", data?.description);
      form.append("Type", data?.type);
      form.append("Street", data?.street);
      form.append("AreaTown", data?.areaTown);
      form.append("City", data?.city);
      form.append("State", data?.state);
      form.append("ZipCode", data?.zipCode);
      form.append("Country", data?.country);
      const res = await fetchClient(`/api/Organization/${organization?.id}/Edit`, {
        method: "POST",
        body: form,
      });
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Group updated successfully");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCountryChange = (value: string) => {
    if (value) {
      setValue("country", value);
    }
  };
  const getOrgDetails = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Organization/${organization?.id}/Detail`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setOrgn(data);
        setValue("name", data?.name);
        setValue("logo", data?.logo ? data?.logo : "");
        setValue("icon", data?.icon ? data?.icon : "");
        setValue("description", data?.description ? data?.description : "");
        setValue("type", data?.type ? data?.type : "");
        setValue("street", data?.street ? data?.street : "");
        setValue("areaTown", data?.areaTown ? data?.areaTown : "");
        setValue("city", data?.city ? data?.city : "");
        setValue("state", data?.state ? data?.state : "");
        setValue("zipCode", data?.zipCode ? data?.zipCode : "");
        setValue("country", data?.country ? data?.country : "");
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
    getOrgDetails();
  }, []);

  return (
    <>
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <TopBar title={watch("name")} />
          <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-4 bg-slate-100">
            <div className="flex justify-between items-start gap-5 max-md:flex-col">
              <div className="space-y-4 basis-2/3 w-[66%] max-md:w-full">
                <div className="bg-white p-3 rounded-lg w-full mb-4">
                  <div className="field">
                    <label htmlFor="name" className="input--label">
                      Organization Name
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
                    <label htmlFor="description" className="input--label">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      {...register("description")}
                      className="input--field"
                    />
                    {errors?.description && (
                      <p className="text-red-500 text-sm py-2">
                        {errors?.description.message}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="type" className="input--label">
                      Organization Type
                    </label>
                    <input
                      type="text"
                      {...register("type")}
                      className="input--field"
                    />
                    {errors?.type && (
                      <p className="text-red-500 text-sm py-2">
                        {errors?.type.message}
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
                <ImageBlock
                  onChange={(file: any) => setValue("logo", file)}
                  label="Logo"
                  image={watch("logo")}
                />
                <ImageBlock
                  onChange={(file: any) => setValue("icon", file)}
                  label="Icon"
                  image={watch("icon")}
                />
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
        </>
      )}
    </>
  );
};

export default OrganizationPage;
