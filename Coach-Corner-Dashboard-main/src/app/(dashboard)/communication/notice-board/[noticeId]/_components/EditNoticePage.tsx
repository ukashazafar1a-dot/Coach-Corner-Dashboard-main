"use client";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";
import { z } from "zod";
import SubmitButton from "@/components/SubmitButton";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import RichTextEditor from "@/hooks/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import SectionLoader from "@/components/loaders/SectionLoader";

const schema = z.object({
  teamId: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short Description is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  severity: z.string().min(1, { message: "Severity is required" }),
});
type formType = z.infer<typeof schema>;
const EditNoticePage = () => {
  const { selectedTeam, setToaster } = useApp();
  const [loading,setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      teamId: selectedTeam?.id,
      title: "",
      shortDescription: "",
      description: "",
      status: "Active",
      severity: "low",
    },
  });
  const router = useRouter();
  const params = useParams();
  const onSubmit = async (data: formType) => {
    try {
      //console.log(data);
      const res = await fetchClient(`/api/Notice/${params?.noticeId}/Edit`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Notice created successfully"
        );
        // reset();
        // router.back();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotice = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Notice/Details/${id}`);
      if (res && res?.succeeded) {
        const { data } = res;
        //console.log(data)
        setValue("title", data?.title);
        setValue("shortDescription", data?.shotDescription);
        setValue("description", data?.description);
        setValue("status", data?.status);
        setValue("severity", data?.severity);
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
    if(params?.noticeId){
      getNotice(params?.noticeId);
    }
  }, [])
  
  return (
    <>
    {loading ? <SectionLoader/> : 
    <div>
      <TopBar title="Notice Board" />
      <form className="bg-slate-100 p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-start gap-5 max-md:flex-col">
          <div className="space-y-4 basis-2/3 w-[66%] max-md:w-full">
            <div className="bg-white p-0 rounded-lg w-full mb-4">
              <div className="form-wrapper">
                <div className="field">
                  <label htmlFor="title" className="input--label">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    className="input--field"
                  />
                  {errors?.title && (
                    <p className="text-red-500 py-2 text-sm">
                      {errors?.title.message}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="description" className="input--label">
                    Description
                  </label>
                  <RichTextEditor
                    value={watch("description")}
                    onChange={(value) => setValue("description", value)}
                  />
                  {errors?.description && (
                    <p className="text-red-500 py-2 text-sm">
                      {errors?.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-0 rounded-lg w-full mb-4">
              <div className="form-wrapper">
                <div className="field">
                  <label htmlFor="excerpt" className="input--label">
                    Excerpt
                  </label>
                  <textarea
                    {...register("shortDescription")}
                    id="excerpt"
                    rows={3}
                    className="input--field"
                  />
                  {errors?.shortDescription && (
                    <p className="text-red-500 py-2 text-sm">
                      {errors?.shortDescription.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full basis-1/3 space-y-4">
            <div className="rounded-lg bg-white p-5">
              <div className="">
                <label className="font-semibold text-sm">Status</label>
                <select
                  className="input--field w-full rounded py-1 font-medium text-sm"
                  value={watch("status")}
                  onChange={(e) => setValue("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Inactive</option>
                </select>
                {errors?.status && (
                  <p className="text-red-500 text-xs font-medium py-2">
                    {errors?.status.message}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-lg bg-white p-5">
              <div className="">
                <label className="font-semibold text-sm">Priority</label>
                <select
                  className="input--field w-full rounded py-1 font-medium text-sm"
                  value={watch("severity")}
                  onChange={(e) => setValue("severity", e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Critical">Critical</option>
                </select>
                {errors?.severity && (
                  <p className="text-red-500 text-xs font-medium py-2">
                    {errors?.severity.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="field pt-5">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              href={"/communication/notice-board"}
              className="btn btn--secondary"
            >
              Cancel
            </Link>
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
    </div> }
    </>
  );
};

export default EditNoticePage;
