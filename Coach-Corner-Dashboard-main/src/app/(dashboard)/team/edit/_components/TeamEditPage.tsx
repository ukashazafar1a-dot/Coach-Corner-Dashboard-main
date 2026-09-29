"use client";
import TopBar from "@/components/TopBar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApp from "@/context/useApp";
import CoachSelect from "@/components/CoachSelect";
import SubmitButton from "@/components/SubmitButton";
import { IoArrowBack } from "react-icons/io5";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import DeleteTeam from "./DeleteTeam";
import ImageBlock from "./ImageBlock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PermissionValidator from "@/components/PermissionValidator";

const schema = z.object({
  id: z.string().nullable(),
  name: z.string().min(1, { message: "Name is required" }),
  logo: z.any().nullable(),
  icon: z.any().nullable(),
  sportId: z.number().min(0, { message: "Sport is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  
});
type formType = z.infer<typeof schema>;
const TeamEditPage = () => {
  const params = useParams();
  const {
    setToaster,
    organization,
    selectedTeam,
    selectedSport,
    user,
    sports,
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
      id: selectedTeam?.id,
      name: selectedTeam?.name || "",
      logo: null,
      icon: null,
      description: "",
      sportId: selectedSport?.id,
    },
  });
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const form = new FormData();
      form.append("Id", data?.id ? data?.id : "");
      form.append("Name", data?.name);
      form.append("Logo", data?.logo || "");
      form.append("Icon", data?.icon || "");
      form.append("SportId", data?.sportId?.toString() || "");
      form.append("Description", data?.description);
      const res = await fetchClient(`/api/team/Upsert`, {
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

  //console.log(errors);

  const getTeamDetail = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Team/${id}/Detail`);
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setValue("id", data?.id);
        setValue("name", data?.name);
        setValue("description", data?.description ? data?.description : "");
        setValue("logo", data?.logo ? data?.logo : "");
        setValue("icon", data?.icon ? data?.icon : "");
        setValue("sportId", data?.sportId);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamDetail(selectedTeam?.id);
  }, []);

  return (
    <PermissionValidator value="Permission.Teams.Edit">
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <TopBar title={watch("name")} />
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-slate-100">
            <div className="flex justify-between items-start gap-5 max-md:flex-col">
              <div className="space-y-4 basis-2/3 w-[66%] max-md:w-full">
                <div className="bg-white p-3 rounded-lg w-full">
                  <div className="field">
                    <label htmlFor="name" className="input--label">
                      Group Name
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
                </div>
              </div>
              <div className="w-full basis-1/3 space-y-4">
                <div className="bg-white p-3 rounded-lg w-full mb-4">
                  <label htmlFor="sport" className="input--label">
                    Sport
                  </label>
                  <Select
                    disabled={true}
                    value={selectedSport ? String(selectedSport?.id) : ""}
                    onValueChange={(sport) => setValue("sportId", Number(sport))}
                  >
                    <SelectTrigger className=" w-full">
                      <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports?.map((sport) => (
                        <SelectItem key={sport.id} value={String(sport?.id)}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors?.sportId && (
                    <p className="text-red-500 text-sm py-2">
                      {errors?.sportId.message}
                    </p>
                  )}
                </div>
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
                <DeleteTeam />
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
    </PermissionValidator>
  );
};

export default TeamEditPage;
