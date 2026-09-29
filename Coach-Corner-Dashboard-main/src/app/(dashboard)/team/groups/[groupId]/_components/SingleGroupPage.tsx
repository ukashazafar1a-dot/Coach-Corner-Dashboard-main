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
import fetchClient from "@/hooks/fetchClient";
import { Group } from "@/helpers/types";
import SectionLoader from "@/components/loaders/SectionLoader";
import ImageBlock from "./ImageBlock";
import DeleteGroup from "./DeleteGroup";
import GroupMembers from "./GroupMembers";
import PlusIcon from "@/components/icons/PlusIcon";
import Link from "next/link";
import AddPlayers from "./AddPlayers";
import PermissionValidator from "@/components/PermissionValidator";

const schema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  description: z.string().nullable(),
  logo: z.any().nullable(),
  icon: z.any().nullable(),
  coachId: z.string().min(3, { message: "Name is required" }),
});
type formType = z.infer<typeof schema>;
const SingleGroupPage = () => {
  const params = useParams();
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
      description: null,
      logo: null,
      icon: null,
      coachId: organization?.id || "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group | null>(null);
  const [emptyc,setEmptyc] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const form = new FormData();
      form.append("Name", data?.name);
      form.append("Description", data?.description || "");
      form.append("Logo", data?.logo || "");
      form.append("Icon", data?.icon || "");
      form.append("CoachId", data?.coachId || "");
      //console.log(Array.from(form));
      const res = await fetchClient(
        `/api/Team/Groups/Update/${params?.groupId}`,
        {
          method: "PUT",
          body: form,
        }
      );
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Group updated successfully");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroup = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Team/Groups/Get/${params?.groupId}`);
      if (res && res?.succeeded) {
        const { data } = res;
        console.log(data);
        setGroup(data);
        setValue("name", data?.name);
        setValue("description", data?.description);
        setValue("logo", data?.logo);
        setValue("icon", data?.icon);
        setValue("coachId", data?.coach?.id);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefetch = () => {
    getGroup();
  };
  useEffect(() => {
    if (params && params?.groupId) {
      getGroup();
    }
  }, []);
  //console.log(errors);
  return (
    <PermissionValidator value="Permission.Groups.Edit">
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <TopBar title={watch("name")} />
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-slate-100">
            <div className="flex justify-between items-start gap-5 max-md:flex-col">
              <div className="space-y-4 basis-2/3 w-[66%] max-md:w-full">
                <div className="bg-white p-3 rounded-lg w-full mb-4">
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
                <div className="bg-white p-3 rounded-lg w-full mb-4">
                <h2 className="text-xl font-semibold mb-4">Group Members ({group?.totalMembers})</h2>
                  <GroupMembers
                    invites={group?.members || []}
                    init={false}
                    onRemove={() => console.log("clicked")}
                    onInitChange={() => console.log("clicked")}
                    onChange={() => console.log("clicked")}
                    handleRefetch={handleRefetch}
                  />
                  <div className="py-2 flex items-start justify-between gap-2">
                    <Link
                      href={`/team/groups/${group?.id}/invite`}
                      className="py-2"
                    >
                      <PlusIcon classes="inline-block pe-1 text-themePrimary" />
                      <span className="text-themePrimary text-sm font-medium">
                        Invite New Members
                      </span>
                    </Link>
                    <AddPlayers groupId={group?.id}  handleRefetch={handleRefetch}/>
                  </div>
                </div>
              </div>
              <div className="w-full basis-1/3 space-y-4">
                <div className="bg-white p-3 rounded-lg w-full mb-4">
                  <p className="mb-2">Coach</p>
                  <CoachSelect
                    label={false}
                    onChange={(value: string) => setValue("coachId", value)}
                  />
                  {errors?.coachId && (
                    <p className="text-red-500 text-sm py-2">
                      {errors?.coachId.message}
                    </p>
                  )}
                </div>
                <ImageBlock
                  onChange={(file: any) => setValue("logo", file)}
                  label="Logo"
                  image={group?.logo}
                />
                <ImageBlock
                  onChange={(file: any) => setValue("icon", file)}
                  label="Icon"
                  image={group?.icon}
                />
              </div>
            </div>
            <div className="field">
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <DeleteGroup />
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

export default SingleGroupPage;
